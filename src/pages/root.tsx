import React from "react";
import {MessageBar, Link, MessageBarType} from "office-ui-fabric-react";

export const Root: React.FunctionComponent = () => {
    return (
        <div>
            <h3>개요</h3>
            <MessageBar
                messageBarType={MessageBarType.success}
                style={{fontSize: '15px'} }
            >
                본 애플리케이션은 <Link href="https://en.wikipedia.org/wiki/Heartbeat_(computing)">하트비트</Link>의 정기적인 검사를 위해 작성되었습니다.
                애플리케이션은 일정 주기마다 자동으로 점검을 실시하고, 애플리케이션에서 지원하는 웹훅을 사용하여 점검 결과를 송신합니다. <br />
                먼저 <Link href="/#/services">서비스</Link>를 등록하고 <Link href="/#/hooks">훅</Link>을 등록하세요! 이후 애플리케이션의 동작은 자동으로 수행됩니다.<br />
                현재 애플리케이션의 버전은 <b>0.0.1</b>입니다.
            </MessageBar>
        </div>
    );
}