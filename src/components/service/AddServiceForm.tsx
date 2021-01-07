import React, {useState} from "react";
import {PrimaryButton, Stack, TextField} from "office-ui-fabric-react";
import {HeartbeatService} from "../../types/service";
import { columnProps, buttonStyles } from '../../pages/services'
import {addService} from "../../api";

export const AddServiceForm: React.FunctionComponent<{reloader: Function}> = ({reloader}) => {
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')

    const handleAdd = () => {
        addService({ name, url })
            .then(res => {
                reloader(true)
            })
    }

    return <Stack horizontal {...columnProps}>
        <TextField label="서비스명" value={name} onChange={e => setName((e.target as HTMLInputElement).value)}/>
        <TextField label="URL" value={url} onChange={e => setUrl((e.target as HTMLInputElement).value)}/>
        <PrimaryButton text="추가" iconProps={{iconName: 'Add'}} style={buttonStyles} onClick={handleAdd}/>
    </Stack>

}