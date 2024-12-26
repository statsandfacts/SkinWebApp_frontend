import React from "react";

interface ActionProviderProps {
  createChatBotMessage: any;
  setState: any;
  children: any;
}

const ActionProvider: React.FC<ActionProviderProps> = ({
  createChatBotMessage,
  setState,
  children,
}) => {
  const handleAge = (message: any) => {
    const botMessage = createChatBotMessage(
      "Thank you! Could you please tell me your gender? (Male/Female/Other/Prefer not to say)"
    );

    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
      userAge: message,
    }));
  };

  const handleGender = (message: any) => {
    const botMessage = createChatBotMessage(
      "Do you have any known allergies or sensitivities? (Yes/No)"
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
      userGender: message,
    }));
  };

  const handleHealthConditions = (message: any) => {
    const botMessage = createChatBotMessage(
      "If yes, please list the allergies you are aware of."
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
      userHealthConditions: message,
    }));
  };

  const handleNoHealthConditions = () => {
    const botMessage = createChatBotMessage(
      "Do you have any pre-existing medical conditions or are you currently taking any medications? (Yes/No)"
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handlePreExistingConditions = (message: any) => {
    const botMessage = createChatBotMessage(
      "If yes, please list your conditions and the medications you are taking."
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
      userPreExistingConditions: message,
    }));
  };

  const handleNoPreExistingConditions = () => {
    const botMessage = createChatBotMessage(
      "What is your primary concern today or what symptoms have you been experiencing?"
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleThankYou = () => {
    const botMessage = createChatBotMessage(
      "Thank you for sharing your health conditions."
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleAge,
            handleGender,
            handleHealthConditions,
            handleNoHealthConditions,
            handlePreExistingConditions,
            handleNoPreExistingConditions,
            handleThankYou,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
