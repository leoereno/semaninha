import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface SwitchProps {
    checked: boolean;
    onChange: Dispatch<SetStateAction<boolean>>;
}

export default function Switch({checked, onChange} : SwitchProps){
    return(
    <label className="switch">
        <input
            type="checkbox"
            checked={checked}
            onChange={e => onChange(e.target.checked)}
        />
        <span className="slider"></span>
    </label>
    )
}