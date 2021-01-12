import React, {useState} from "react";
import {MarqueeSelection, Selection, DetailsList, DetailsListLayoutMode, IColumn, SelectionMode} from 'office-ui-fabric-react'
import _ from 'lodash'
import {format} from '../../utils/moment-util'
import {MomentFormat} from "../../enums/moment-format";
import {HeartbeatService} from "../../types/service";

const columns: IColumn[] = [
    {
        key: 'column1',
        name: ' 이름',
        fieldName: 'name',
        minWidth: 80,
        maxWidth: 80,
        isRowHeader: true,
        isResizable: true,
        data: 'string',
        isPadded: true,
    },
    {
        key: 'column2',
        name: 'URL',
        fieldName: 'url',
        minWidth: 300,
        maxWidth: 600,
        isRowHeader: true,
        isResizable: true,
        data: 'string',
        isPadded: true,
    },
    {
        key: 'column3',
        name: '상태 코드',
        fieldName: 'status',
        minWidth: 40,
        maxWidth: 40,
        isRowHeader: true,
        isResizable: true,
        data: 'number',
        isPadded: true,
    },
    {
        key: 'column4',
        name: '마지막 수정시간',
        fieldName: 'updateDt',
        minWidth: 160,
        maxWidth: 160,
        isRowHeader: true,
        isResizable: true,
        data: 'string',
        isPadded: true,
        onRender: (item: HeartbeatService) => format(item.updateDt, MomentFormat.YYYY_MM_DD_HH24_MI_SS)
    },
]
export const HeartBeatTestList: React.FunctionComponent<{items: HeartbeatService[], setSelectedIdList: Function}> = ({ items, setSelectedIdList }) => {

    const _getKey = (item: HeartbeatService) => String(item.id)

    const _selection = new Selection({
        onSelectionChanged: () => {
            setSelectedIdList(_.map(_selection.getSelection(), 'id'))
        },
    });

    return <div>
        <MarqueeSelection selection={_selection} isEnabled={false}>
            <DetailsList
                selection={_selection}
                items={items}
                compact={true}
                columns={columns}
                selectionMode={SelectionMode.multiple}
                enterModalSelectionOnTouch={true}
                getKey={_getKey}
                setKey="multiple"
                layoutMode={DetailsListLayoutMode.justified}
                isHeaderVisible={true}
            />
        </MarqueeSelection>
    </div>
}