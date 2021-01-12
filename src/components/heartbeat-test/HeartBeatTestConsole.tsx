import * as React from 'react';
import { PrimaryButton, DefaultButton, BaseButton, Stack, IStackProps, IStackStyles, TextField } from 'office-ui-fabric-react';
import {CSSProperties, useState} from "react";
import {testHeartBeat, testHeartBeatAll} from "../../api";
import {HeartBeatApiWrapper} from "../../types/api";
import {AjaxResult} from "../../enums/ajax-result";
import _ from 'lodash';

const stackStyles: Partial<IStackStyles> = { root: { width: '100%' } };
const stackTokens = { childrenGap: 50 };
const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: '100%' } },
};
const buttonStyles: CSSProperties = {
    marginLeft: '15px'
}

type TestResult = {
    name: string
    url: string
    status: number
    datetime: string
}

export const HeartBeatTestConsole: React.FunctionComponent<{selectedIdList: number[]}> = ({selectedIdList}) => {
    const [output, setOutput] = useState('')

    const handleTestAll = () => {
        testHeartBeatAll().then(res => {
            const result: HeartBeatApiWrapper = res.data
            if (result.status === AjaxResult.SUCCESS) {
                setOutput(output + convertToOutput((result.data as TestResult[])))
            } else {
                alert('작업을 수행 중 오류가 발생하였습니다.');
            }
        })
    }

    const handleTestSelected = () => {
        if (selectedIdList.length <= 0) {
            alert('검사할 서비스를 선택한 후 작업을 수행해주세요.');
        }
        testHeartBeat({ id: selectedIdList }).then(res => {
            const result: HeartBeatApiWrapper = res.data
            if (result.status === AjaxResult.SUCCESS) {
                setOutput(output + convertToOutput((result.data as TestResult[])))
            } else {
                alert('작업을 수행 중 오류가 발생하였습니다.');
            }
        })
    }

    const handleReset = () => {
        setOutput('');
    }

    const convertToOutput = (resultList: TestResult[]) => {
        let result = '';
        _.each(resultList, elem => {
            result += `[${elem.datetime}] ${elem.name}(${elem.url}): ${elem.status}\n`
        });
        return result;
    }

    return (
        <Stack tokens={stackTokens} styles={stackStyles}>
            <Stack {...columnProps}>
                <TextField label="테스트 결과"
                           multiline
                           rows={8}
                           readOnly={true}
                           resizable={false}
                           value={output}
                />
            </Stack>
            <Stack horizontal style={{ marginTop: '8px' }}>
                <PrimaryButton iconProps={{ iconName: 'TestBeakerSolid' }} text="전체 테스트" onClick={handleTestAll} />
                <PrimaryButton iconProps={{ iconName: 'TestCase' }} style={buttonStyles} text="선택 테스트" onClick={handleTestSelected} />
                <DefaultButton iconProps={{ iconName: 'Refresh' }} style={buttonStyles} text="초기화" onClick={handleReset} />
            </Stack>
        </Stack>
    );
};
