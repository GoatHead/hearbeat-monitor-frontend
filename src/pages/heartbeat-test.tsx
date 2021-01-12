import React, {useEffect, useState} from "react";
import {IconButton, MessageBar, MessageBarType} from "office-ui-fabric-react";
import {ServiceForm} from "../components/service/ServiceForm";
import {HeartBeatTestList} from '../components/heartbeat-test/HeartBeatTestList';
import {HeartBeatTestConsole} from '../components/heartbeat-test/HeartBeatTestConsole';
import {getServiceList} from "../api";
import {HeartBeatApiWrapper} from "../types/api";
import {AjaxResult} from "../enums/ajax-result";
import {HeartbeatService} from "../types/service";

const detailMessage = () => (
    <MessageBar
        messageBarType={MessageBarType.success}
        style={{fontSize: '15px'} }
    >
        등록된 서비스들을 테스트합니다.
    </MessageBar>
);

export const HeartbeatTest: React.FunctionComponent = () => {
    const [itemList, setItemList] = useState<HeartbeatService[] | undefined>([])
    const [reset, setReset] = useState(false)
    const [selectedIdList, setSelectedIdList] = useState<number[]>([])

    useEffect(() => {
        _getServiceList();
    }, [])

    useEffect(() => {
        if (reset) {
            _getServiceList()
        }
    }, [reset])

    const _getServiceList = (): void => {
        getServiceList()
            .then(res => {
                const calledService: HeartBeatApiWrapper = res.data
                if (calledService.status === AjaxResult.SUCCESS) {
                    const serviceList = calledService.data || undefined
                    setItemList([])
                    setItemList(serviceList)
                    setReset(false)
                } else {
                    setItemList(undefined)
                }
            })
    }

    const _renderHeartBeatTestList = (): JSX.Element | JSX.Element[] => {
        if (itemList === undefined || itemList.length === 0) {
            return <h5>검사할 서비스가 존재하지 않습니다.</h5>
        } else {
            return <HeartBeatTestList items={itemList!} setSelectedIdList={setSelectedIdList} />
        }
    }

    const _renderHeartBeatConsole = (): JSX.Element | JSX.Element[] => {
        if (itemList === undefined || itemList.length === 0) {
            return <div />
        } else {
            return <HeartBeatTestConsole selectedIdList={selectedIdList} />
        }
    }

    return (
        <div>
            <h3>하트비트 테스트 <IconButton iconProps={{iconName: 'Refresh'}} text="결과 초기화" onClick={() => setReset(true)}/> </h3>
            {detailMessage()}<br/>
            {_renderHeartBeatTestList()} <br/>
            {_renderHeartBeatConsole()}
        </div>
    );
}