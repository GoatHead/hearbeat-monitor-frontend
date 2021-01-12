import React, {CSSProperties, useEffect, useState} from "react";
import {HeartbeatApplicationSettings} from '../types/application-settings'
import {
    IconButton,
    IStackProps,
    MessageBar,
    MessageBarType,
    PrimaryButton,
    Stack,
    TextField
} from "office-ui-fabric-react";
import {getApplicationSetting, modifyApplicationSetting} from '../api'
import moment from 'moment'
import {HeartBeatApiWrapper} from "../types/api";
import {AjaxResult} from "../enums/ajax-result";


export const columnProps: Partial<IStackProps> = {
    tokens: {childrenGap: 15},
    styles: {root: {width: 1200}},
};

export const buttonStyles: CSSProperties = {
    marginTop: '29px'
}

const detailMessage = () => (
    <MessageBar
        messageBarType={MessageBarType.success}
        style={{fontSize: '15px'} }
    >
        애플리케이션 설정 정보를 수정합니다.
    </MessageBar>
);

export const Application: React.FunctionComponent = () => {
    const [cycleSec, setCycleSec] = useState('300')
    const [readableCycle, setReadableCycle] = useState<string>()
    const [reload, setReload] = useState<boolean>(false)

    useEffect(() => {
        loadApplicationSettings();
    }, [])

    useEffect(() => {
        if (reload) {
            loadApplicationSettings();
        }
    }, [reload])

    useEffect(() => {
        setReadableCycle(cycleSecToReadable(cycleSec))
    }, [cycleSec])

    const loadApplicationSettings = () => {
        getApplicationSetting().then(res => {
            const result: HeartBeatApiWrapper = res.data
            if (result.status === AjaxResult.FAIL) {
                alert('작업을 수행 중 오류가 발생하였습니다.');
            } else {
                const aSettings: HeartbeatApplicationSettings = res.data.data
                setCycleSec(String(aSettings.cycleSec));

                setReload(false);
            }
        });
    }

    const cycleSecToReadable = (cycleSec: string): string => {
        const parsedNumber = Number(cycleSec);
        if (isNaN(parsedNumber)) {
            return '';
        }
        const duration = moment.duration(parsedNumber, 'seconds');
        const n = 24 * 60 * 60 * 1000;
        const days = Math.floor(duration.asMilliseconds() / n);
        const rest = duration.asMilliseconds() % n
        let resultStr = ''
        if (days > 0) {
            resultStr += `${days}일`
        }
        if (rest !== 0) {
            const hours = moment.duration(rest, 'milliseconds').hours();
            const mins = moment.duration(rest, 'milliseconds').minutes();
            const secs = moment.duration(rest, 'milliseconds').seconds();
            if (hours > 0) {
                if (resultStr !== '') resultStr += ' '
                resultStr += moment.utc(rest).format('H시간');
            }
            if (mins > 0) {
                if (resultStr !== '') resultStr += ' '
                resultStr += moment.utc(rest).format('m분');
            }
            if (secs > 0) {
                if (resultStr !== '') resultStr += ' '
                resultStr += moment.utc(rest).format('s초');
            }
        }
        return resultStr
    }

    const handleCycleModify = () => {
        const parsedNumber = Number(cycleSec);
        if (isNaN(parsedNumber)) {
            return alert('점검 주기에는 숫자를 입력해주세요.');
        }
        modifyApplicationSetting({cycleSec: parsedNumber})
            .then(res => {
                const result: HeartBeatApiWrapper = res.data
                if (result.status === AjaxResult.FAIL) {
                    alert('작업을 수행 중 오류가 발생하였습니다.');
                }
                setReload(true)
            })
    }

    return (
        <div>
            <h3>애플리케이션 설정</h3>
            {detailMessage()} <br/>
            <Stack horizontal {...columnProps}>
                <TextField label="점검 주기(단위: 초)" value={String(cycleSec)} onChange={e => setCycleSec((e.target as HTMLInputElement).value)}/>
                <TextField
                            label="일/시/분/초 변환값"
                           value={readableCycle}
                           borderless={false}
                           readOnly={true}
                           style={{maxWidth: '260px'}} />
                <PrimaryButton text="수정" iconProps={{ iconName: 'Edit' }} style={ buttonStyles } onClick={handleCycleModify} />
            </Stack>
        </div>
    );
}