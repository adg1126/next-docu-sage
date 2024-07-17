import { createContext, useState } from 'react';
import { ReactNode } from 'react';
import { useToast } from '../ui/use-toast';
import { useMutation } from '@tanstack/react-query';

interface ChatContextProviderProps {
  fileId: string;
  children: ReactNode;
}

export const ChatContext = createContext<StreamResponse>({
  addMessage: () => {},
  message: '',
  handleInputChange: () => {},
  isLoading: false,
});

export const ChatContextProvider = ({
  fileId,
  children,
}: ChatContextProviderProps) => {
  const [message, setMessage] = useState<string>(''),
    [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      const res = await fetch('/api/message', {
        method: 'POST',
        body: JSON.stringify({ fileId, message }),
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      return res.body;
    },
  });

  const addMessage = () => sendMessage({ message });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <ChatContext.Provider
      value={{
        addMessage,
        message,
        handleInputChange,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
