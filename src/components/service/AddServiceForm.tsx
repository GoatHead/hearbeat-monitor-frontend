import React, {useState} from "react";
import {PrimaryButton, Stack, TextField} from "office-ui-fabric-react";
import { columnProps, buttonStyles } from '../../pages/services'
import {addService} from "../../api";
import {HeartBeatApiWrapper} from "../../types/api";
import {AjaxResult} from "../../enums/ajax-result";

export const AddServiceForm: React.FunctionComponent<{reloader: Function}> = ({reloader}) => {
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')

    const handleAdd = () => {
        addService({ name, url })
            .then(res => {
                const result: HeartBeatApiWrapper = res.data
                if (result.status === AjaxResult.FAIL) {
                    alert('작업을 수행 중 오류가 발생하였습니다.');
                }
                reloader(true)
            })
    }

    return <Stack horizontal {...columnProps}>
        <TextField label="서비스명" value={name} onChange={e => setName((e.target as HTMLInputElement).value)}/>
        <TextField label="URL" value={url} onChange={e => setUrl((e.target as HTMLInputElement).value)}/>
        <PrimaryButton text="추가" iconProps={{iconName: 'Add'}} style={buttonStyles} onClick={handleAdd}/>
    </Stack>

}