import React, {useState} from "react";
import {DefaultButton, PrimaryButton, Stack, TextField} from "office-ui-fabric-react";
import {format as momentFormat} from "../../utils/moment-util";
import {MomentFormat} from "../../enums/moment-format";
import {HeartbeatService} from "../../types/service";
import { columnProps, buttonStyles } from '../../pages/services'
import {addService, deleteService, modifyService} from "../../api";

export const ServiceForm: React.FunctionComponent<{data: HeartbeatService, reloader: Function}> = ({data, reloader}) => {
    const id = data.id
    const [name, setName] = useState(data.name)
    const [url, setUrl] = useState(data.url)

    const handleModify = () => {
        modifyService({ id, name, url })
            .then(res => {
                reloader(true)
            })
    }

    const handleDelete = () => {
        if (confirm('정말로 삭제하겠습니까?')) {
            deleteService({ id })
                .then(res => {
                    reloader(true)
                })
        }
    }

    return (<Stack horizontal {...columnProps}>
        <TextField label="서비스명" value={name} onChange={e => setName((e.target as HTMLInputElement).value)}/>
        <TextField label="URL" value={url} onChange={e => setUrl((e.target as HTMLInputElement).value)}/>
        <TextField label="수정된 시각" readOnly value={momentFormat(data.updateDt, MomentFormat.YYYY_MM_DD_HH24_MI_SS)} />
        <TextField label="마지막 상태 코드" readOnly value={String(data.status)} />
        <PrimaryButton text="수정" iconProps={{ iconName: 'Edit' }} style={ buttonStyles } onClick={handleModify} />
        <DefaultButton text="삭제" iconProps={{ iconName: 'Delete' }} style={ buttonStyles } onClick={handleDelete} />
    </Stack>);

}