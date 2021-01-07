import React, {useState} from "react";
import {PrimaryButton, Stack, TextField} from "office-ui-fabric-react";
import { columnProps, buttonStyles } from '../../pages/services'
import {addHook} from "../../api";

export const AddHookForm: React.FunctionComponent<{reloader: Function}> = ({reloader}) => {
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const type = 'MS-TEAMS'

    const handleAdd = () => {
        addHook({ name, url, type })
            .then(res => {
                reloader(true)
            })
    }

    return <Stack horizontal {...columnProps}>
        <TextField label="이름" value={name} onChange={e => setName((e.target as HTMLInputElement).value)}/>
        <TextField label="URL" value={url} onChange={e => setUrl((e.target as HTMLInputElement).value)}/>
        <TextField label="훅 타입" value={type} readOnly />
        <PrimaryButton text="추가" iconProps={{iconName: 'Add'}} style={buttonStyles} onClick={handleAdd}/>
    </Stack>

}