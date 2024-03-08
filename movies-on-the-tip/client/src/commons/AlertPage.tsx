import { ReactNode } from "react"
import { Alert } from "react-bootstrap"

type Props = {
    text: string,
    variant: string,
    children?: ReactNode,
}
const AlertPage = ({ text, variant, children }: Props) => {


    return (
        <div className="alert-box">
            <Alert variant={variant}>
                {text} <br />
                {children}
            </Alert>
        </div>
    )
}

export default AlertPage;