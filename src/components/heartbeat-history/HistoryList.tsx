import React from "react";
import {HeartbeatHistory} from "../../types/history";
import {DetailsList, DetailsListLayoutMode, IColumn, SelectionMode} from 'office-ui-fabric-react'
import {SearchCondition} from "../../types/searchCondition";
import {format} from '../../utils/moment-util'
import {MomentFormat} from "../../enums/moment-format";

const columns: IColumn[] = [
    {
        key: 'column1',
        name: 'number',
        ariaLabel: '순번',
        iconName: 'NumberedList',
        isIconOnly: true,
        fieldName: 'name',
        data: 'number',
        minWidth: 64,
        maxWidth: 64,
        onRender: (item: HeartbeatHistory) => {
            return item.no;
        },
    },
    {
        key: 'column2',
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
        key: 'column3',
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
        key: 'column4',
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
        key: 'column5',
        name: '점검 일시',
        fieldName: 'createDt',
        minWidth: 160,
        maxWidth: 160,
        isRowHeader: true,
        isResizable: true,
        data: 'string',
        isPadded: true,
        onRender: (item: HeartbeatHistory) => format(item.createDt, MomentFormat.YYYY_MM_DD_HH24_MI_SS)
    },
]
export const HistoryList: React.FunctionComponent<{items: HeartbeatHistory[], searchCondition: SearchCondition}> = ({ items, searchCondition }) => {

    const _getKey = (item: HeartbeatHistory) => String(item.no)

    return <div>
        <DetailsList
            items={items}
            compact={true}
            columns={columns}
            selectionMode={SelectionMode.none}
            getKey={_getKey}
            setKey="multiple"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
        />
    </div>
}