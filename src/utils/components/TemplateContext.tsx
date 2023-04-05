import React, { FC, useState } from "react";
import "moment/locale/es-mx";
export const TemplateContext = React.createContext<any>(null);

const TemplateProvider: FC<{ children: any }> = React.memo(({ children }) => {
  const [notifications, setNotifications] = useState(null);
  return (
    <TemplateContext.Provider
      value={{ notifications,}}>
      {children}
    </TemplateContext.Provider>
  );
});

export default TemplateProvider;
