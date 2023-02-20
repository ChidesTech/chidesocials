import "./Popup.css";

export default function Popup(prop) {
    return <div className={`alert alert-${prop.variant} popup p-2`}>{prop.children}</div>
    
}