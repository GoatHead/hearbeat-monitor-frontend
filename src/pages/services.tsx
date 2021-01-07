import React, {CSSProperties, useEffect, useState} from "react";
import {HeartBeatApiWrapper} from '../types/api'
import {HeartbeatService} from "../types/service";
import {AjaxResult} from "../enums/ajax-result";
import {IconButton, IStackProps, Link, MessageBar, MessageBarType} from "office-ui-fabric-react";
import {getServiceList} from "../api";
import {ServiceForm} from "../components/service/ServiceForm";
import {AddServiceForm} from "../components/service/AddServiceForm";

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
        하트비트를 검사할 서비스를 등록합니다. 등록한 서비스는 지정된 시간마다 살아있는지 여부를 검사 받게 되며,
        검사 결과는 애플리케이션에 등록된 웹훅을 통해 전송됩니다.
    </MessageBar>
);

export const Services: React.FunctionComponent = () => {
    const [serviceList, setServiceList] = useState<HeartbeatService[] | undefined>(undefined)
    const [isRedraw, setRedraw] = useState<Boolean>(false)

    // 페이지 진입할 때 한 번만 수행
    useEffect(() => {
        _getServiceList()
    }, [])

    // isRedraw가 true로 설정되면 페이지를 새로 그림
    useEffect(() => {
        if (isRedraw) {
            _getServiceList()
            setRedraw(false)
        }
    }, [isRedraw])

    const _getServiceList = (): void => {
        getServiceList()
            .then(res => {
                const calledService: HeartBeatApiWrapper = res.data
                if (calledService.status === AjaxResult.SUCCESS) {
                    const serviceList = calledService.data || undefined
                    setServiceList([])
                    setServiceList(serviceList)
                } else {
                    setServiceList(undefined)
                }
            })
    }

    const _renderServiceList = (): JSX.Element | JSX.Element[] => {
        if (serviceList === undefined) {
            return <h5>등록된 서비스가 존재하지 않습니다.</h5>
        } else {
            return serviceList!.map(elem => {
                return <ServiceForm key={elem.id} data={elem} reloader={setRedraw}/>
            })
        }
    }

    return (
        <div>
            <h3>등록된 서비스 <IconButton iconProps={{iconName: 'Refresh'}} text="리로드" onClick={() => setRedraw(true)}/> </h3>
            {detailMessage()}<br/>
                {_renderServiceList()} <br/>
                <AddServiceForm reloader={setRedraw} />
        </div>
);
}