import React from "react";
import { Stack } from 'office-ui-fabric-react'
import {HistorySearchBox} from "./HistorySearchBox";
import {HistorySearchPeriod} from "./HistorySearchPeriod";

export const HistorySearchBar: React.FunctionComponent<{setSearchCondition: Function, fetcher: Function}> = ({setSearchCondition, fetcher}) => {
    return <div>
        <Stack horizontal>
            <HistorySearchPeriod setSearchCondition={setSearchCondition}  />
            <HistorySearchBox setSearchCondition={setSearchCondition} fetcher={fetcher} />
        </Stack>
    </div>
}