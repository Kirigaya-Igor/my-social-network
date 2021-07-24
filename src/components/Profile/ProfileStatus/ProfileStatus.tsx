import React, {useState, useEffect, ChangeEvent} from 'react';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatus: React.FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    return (
        <div>
            {editMode
                ?
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                           value={status}/>
                </div>
                :
                <div>
                    <b>Status: </b>
                    <span onDoubleClick={activateEditMode}>{`${props.status}` || 'No status'}</span>
                </div>
            }
        </div>
    )
}

export default ProfileStatus;