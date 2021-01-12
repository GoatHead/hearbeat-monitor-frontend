import React, {useState} from "react";
import {PrimaryButton, Stack, TextField} from "office-ui-fabric-react";
import { columnProps, buttonStyles } from '../../pages/services'
import {addHook} from "../../api";
import {HeartBeatApiWrapper} from "../../types/api";
import {AjaxResult} from "../../enums/ajax-result";

export const AddHookForm: React.FunctionComponent<{reloader: Function}> = ({reloader}) => {
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const type = 'MS-TEAMS'

    const handleAdd = () => {
        addHook({ name, url, type })
            .then(res => {
                const result: HeartBeatApiWrapper = res.data
                if (result.status === AjaxResult.FAIL) {
                    alert('작업을 수행 중 오류가 발생하였습니다.');
                }
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