import React, { useRef, useEffect } from "react";

const TelegramLoginButton = ({
  wrapperProps,
  usePic = false,
  botName,
  className,
  buttonSize = "",
  dataOnauth,
  cornerRadius,
  requestAccess = true,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current === null) return;

    if (typeof dataOnauth === "undefined") {
      throw new Error(
        "Prop dataOnauth (callback fn) should be defined to handle the authentication."
      );
    }

    if (typeof dataOnauth === "function") {
      window.TelegramLoginWidget = {
        dataOnauth: (user) => dataOnauth(user),
      };
    }

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", botName);
    script.setAttribute("data-size", buttonSize);

    if (cornerRadius !== undefined) {
      script.setAttribute("data-radius", cornerRadius.toString());
    }

    if (requestAccess) {
      script.setAttribute("data-request-access", "write");
    }

    script.setAttribute("data-userpic", usePic.toString());
    
    // Используем data-onauth вместо data-auth-url
    script.setAttribute("data-onauth", "TelegramLoginWidget.dataOnauth(user)");

    script.async = true;

    ref.current.appendChild(script);
  }, [
    botName,
    buttonSize,
    cornerRadius,
    dataOnauth,
    requestAccess,
    usePic,
    ref,
  ]);

  return (
    <div
      ref={ref}
      className={className}
      {...wrapperProps}
    />
  );
};

export default TelegramLoginButton;
