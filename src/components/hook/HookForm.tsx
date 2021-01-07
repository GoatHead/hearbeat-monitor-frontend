import React, {useState} from "react";
import {DefaultButton, PrimaryButton, Stack, TextField} from "office-ui-fabric-react";
import {format as momentFormat} from "../../utils/moment-util";
import {MomentFormat} from "../../enums/moment-format";
import {HeartbeatHook} from "../../types/hook";
import { columnProps, buttonStyles } from '../../pages/services'
import {deleteHook, modifyHook} from "../../api";

export const HookForm: React.FunctionComponent<{data: HeartbeatHook, reloader: Function}> = ({data, reloader}) => {
    const id = data.id
    const [name, setName] = useState(data.name)
    const [url, setUrl] = useState(data.url)
    const type = 'MS-TEAMS'

    const handleModify = () => {
        modifyHook({ id, name, url, type })
            .then(res => {
                reloader(true)
            })
    }

    const handleDelete = () => {
        if (confirm('정말로 삭제하겠습니까?')) {
            deleteHook({ id })
                .then(res => {
                    reloader(true)
                })
        }
    }

    return (<Stack horizontal {...columnProps}>
        <TextField label="이름" value={name} onChange={e => setName((e.target as HTMLInputElement).value)}/>
        <TextField label="URL" value={url} onChange={e => setUrl((e.target as HTMLInputElement).value)}/>
        <TextField label="훅 타입" value={type} readOnly onChange={e => setUrl((e.target as HTMLInputElement).value)}/>
        <TextField label="수정된 시각" readOnly value={momentFormat(data.updateDt, MomentFormat.YYYY_MM_DD_HH24_MI_SS)} />
        <PrimaryButton text="수정" iconProps={{ iconName: 'Edit' }} style={ buttonStyles } onClick={handleModify} />
        <DefaultButton text="삭제" iconProps={{ iconName: 'Delete' }} style={ buttonStyles } onClick={handleDelete} />
    </Stack>);

}