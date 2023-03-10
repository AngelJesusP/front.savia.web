import React, { FC, useState, useEffect } from "react";
import "moment/locale/es-mx";

export const TemplateContext = React.createContext<any>(null);
const token = localStorage.getItem("tk_");

const TemplateProvider: FC<{ children: any }> = React.memo(({ children }) => {
  const [notifications, setNotifications] = useState(null);

  let URL: string = import.meta.env.VITE_URL;

  // useEffect(() => {
  //   if (token) {
  //     const serverSendEvent = new EventSource(
  //       `${URL}/api/v1/notificacion/subcribir`
  //     );
  //     serverSendEvent.addEventListener("NUEVOS_MENSAJES_USUARIOS", (event) => {
  //       setNotifications(event?.data || null);
  //     });
  //   }
  // }, [token]);

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
