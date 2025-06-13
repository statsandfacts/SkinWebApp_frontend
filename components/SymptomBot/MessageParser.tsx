import React from "react";

interface MessageParserProps {
  children: any;
  actions: any;
}

const MessageParser: React.FC<MessageParserProps> = ({ children, actions }) => {
  const parse = (message: any) => {
    const lowerCaseMessage = message.toLowerCase().trim();

    if (!isNaN(message) && message.trim() !== "") {
      actions.handleAge(message);
    } else if (
      lowerCaseMessage === "male" ||
      lowerCaseMessage === "female" ||
      lowerCaseMessage === "other" ||
      lowerCaseMessage === "prefer not to say"
    ) {
      actions.handleGender(message);
    } else if (lowerCaseMessage === "yes") {
      if (message.toLowerCase().includes("allergies")) {
        actions.handleHealthConditions(message);
      } else if (
        message.toLowerCase().includes("medications") ||
        message.toLowerCase().includes("conditions")
      ) {
        actions.handlePreExistingConditions(message);
      } else {
        actions.handleHealthConditions(message);
      }
    } else if (lowerCaseMessage === "no") {
      if (message.toLowerCase().includes("allergies")) {
        actions.handleNoHealthConditions();
      } else if (
        message.toLowerCase().includes("medications") ||
        message.toLowerCase().includes("conditions")
      ) {
        actions.handleNoPreExistingConditions();
      } else {
        actions.handleNoHealthConditions();
      }
    } else {
      actions.handleThankYou();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
