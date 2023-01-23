import { Alert as Message, Space } from 'antd';

interface IAlert {
    message : string;
    type: string | any;
    hidden : boolean
}

export const Alert: React.FC<IAlert> = ({message, type, hidden}) => <Space direction="vertical" style={{ width: '100%', marginTop: 10 }}>
    {!hidden ? <Message message={message} type={type} closable /> : null}
</Space>