import React, {useEffect, useState} from "react";
import {Pagination} from '@uifabric/experiments'
import {SearchCondition} from "../types/searchCondition";
import { HistorySearchBar } from '../components/heartbeat-history/searchbar/HistorySearchBar'
import {HistoryList} from "../components/heartbeat-history/HistoryList";
import { HeartbeatHistory } from '../types/history'
import {getHeartBeatHistory} from "../api";
import _ from 'lodash'
import {IconButton} from "office-ui-fabric-react";

export const History: React.FunctionComponent = () => {
    const [pageIndex, setPageIndex] = useState(0)
    const itemSize = 10
    const [totalPageCount, setTotalPageCount] = useState(10)
    const [totalItemCount, setTotalItemCount] = useState(0)
    const [itemList, setItemList] = useState<HeartbeatHistory[]>([])
    const [sc, setSc] = useState<SearchCondition>({
        status: '',
        name: '',
        url: '',
        startDate: '',
        endDate: '',
        pageStart: 1,
        pageSize: 10
    })

    const _fetchHeartBeatHistoryList = () => {
        getHeartBeatHistory(sc).then(res => {
            const data = res.data.data
            setPageIndex(data.page - 1)
            setTotalPageCount(_.ceil(data.itemCount / data.pageSize))
            setTotalItemCount(data.itemCount)

            const itemList = _.map(data.data, (elem: HeartbeatHistory, idx: number) => {
                elem.no = (data.page - 1) * 10 + idx + 1
                return elem
            })
            setItemList(itemList)
        })
    }

    const handleOnChangePage = (nextPageIndex: number) => {
        sc.pageStart = nextPageIndex + 1
        _fetchHeartBeatHistoryList()
    }

    useEffect(() => {
        _fetchHeartBeatHistoryList()
    }, [])

    return (
        <div>
            <h3>점검 이력 </h3>
            <HistorySearchBar
              setSearchCondition={setSc}
              fetcher={_fetchHeartBeatHistoryList}
            />
            <HistoryList
                items={itemList}
                searchCondition={sc}
            />
            <Pagination
                selectedPageIndex={pageIndex}
                pageCount={totalPageCount}
                itemsPerPage={itemSize}
                totalItemCount={totalItemCount}
                previousPageAriaLabel={'previous page'}
                nextPageAriaLabel={'next page'}
                firstPageAriaLabel={'first page'}
                lastPageAriaLabel={'last page'}
                pageAriaLabel={'page'}
                selectedAriaLabel={'selected'}
                format="buttons"
                strings={ { divider: "-" , of: ", 총 이력: " }}
                onPageChange={ (nextPageIndex) => handleOnChangePage(nextPageIndex)}
            />
        </div>
);
}