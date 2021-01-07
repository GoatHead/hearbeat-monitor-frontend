import React, {CSSProperties, useEffect, useState} from "react";
import {HeartBeatApiWrapper} from '../types/api'
import {HeartbeatHook} from "../types/hook";
import {AjaxResult} from "../enums/ajax-result";
import {
    IconButton,
    IStackProps,
    MessageBar,
    MessageBarType,
    PrimaryButton,
    Stack,
    TextField
} from "office-ui-fabric-react";
import {getHookList} from "../api";
import {HookForm} from "../components/hook/HookForm";
import {AddHookForm} from "../components/hook/AddHookForm";

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
        하트비트 검사 결과가 전송될 훅을 등록합니다. 현재 애플리케이션에서는 MS-TEAMS 타입만 지원됩니다.
    </MessageBar>
);

export const Hooks: React.FunctionComponent = () => {
    const [serviceList, setHookList] = useState<HeartbeatHook[] | undefined>(undefined)
    const [isRedraw, setRedraw] = useState<Boolean>(false)

    // 페이지 진입할 때 한 번만 수행
    useEffect(() => {
        _getHookList()
    }, [])

    // isRedraw가 true로 설정되면 페이지를 새로 그림
    useEffect(() => {
        if (isRedraw) {
            _getHookList()
            setRedraw(false)
        }
    }, [isRedraw])

    const _getHookList = (): void => {
        getHookList()
            .then(res => {
                const calledHook: HeartBeatApiWrapper = res.data
                if (calledHook.status === AjaxResult.SUCCESS) {
                    const serviceList = calledHook.data || undefined
                    setHookList([])
                    setHookList(serviceList)
                } else {
                    setHookList(undefined)
                }
            })
    }

    const _renderHookList = (): JSX.Element | JSX.Element[] => {
        if (serviceList === undefined) {
            return <h5>등록된 훅이 존재하지 않습니다.</h5>
        } else {
            return serviceList!.map(elem => {
                return <HookForm key={elem.id} data={elem} reloader={setRedraw}/>
            })
        }
    }

    return (
        <div>
            <h3>등록된 훅 <IconButton iconProps={{iconName: 'Refresh'}} text="리로드" onClick={() => setRedraw(true)}/> </h3>
            {detailMessage()} <br/>
            {_renderHookList()} <br/>
            <AddHookForm reloader={setRedraw} />
        </div>
    );
}