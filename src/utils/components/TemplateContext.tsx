import React, { FC, useState } from "react";
import "moment/locale/es-mx";

export const TemplateContext = React.createContext<any>(null);

const TemplateProvider: FC<{ children: any }> = React.memo(({ children }) => {
  const [notifications, setNotifications] = useState(null);

  let URL: string = import.meta.env.VITE_URL;
  const serverSendEvent = new EventSource(
    `${URL}/api/v1/notificacion/subcribir`
  );
  serverSendEvent.addEventListener("NUEVOS_MENSAJES_USUARIOS", (event) => {
    setNotifications(event?.data || null);
  });

  return (
    <TemplateContext.Provider
      value={{
        notifications,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
});

export default TemplateProvider;
