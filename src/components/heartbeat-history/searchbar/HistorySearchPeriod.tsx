import React, {CSSProperties, FormEvent, useEffect, useState} from "react";
import {
    DatePicker,
    DayOfWeek,
    IDatePickerStrings,
    mergeStyleSets,
    Stack
} from 'office-ui-fabric-react';
import {SearchCondition} from "../../../types/searchCondition";

const DayPickerStrings: IDatePickerStrings = {
    months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],

    shortMonths: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],

    days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],

    shortDays: ['일', '월', '화', '수', '목', '금', '토'],

    goToToday: '오늘로',
    prevMonthAriaLabel: '이전 달로',
    nextMonthAriaLabel: '다음 달로',
    prevYearAriaLabel: '이전 해로',
    nextYearAriaLabel: '다음 해로',
    closeButtonAriaLabel: '닫기',
    monthPickerHeaderAriaLabel: '{0}, 변경할 해를 선택하세요.',
    yearPickerHeaderAriaLabel: '{0}, 변경할 달을 선택하세요.',
};

const controlClass = mergeStyleSets({
    control: {
        margin: '0 0 15px 0',
        maxWidth: '300px',
    },
});

const tildeStyle: CSSProperties = {
    marginLeft: '10px',
    marginRight: '10px',
    marginTop: '35.5px'
}


const formatYyyy_Mm_Dd = (date: Date | undefined) => {
    if (date == undefined) {
        return ''
    }
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
}

export const HistorySearchPeriod: React.FunctionComponent<{setSearchCondition: Function}> = ({setSearchCondition}) => {
    const [startDate, setStartDate] = useState<Date | null | undefined>()
    const [endDate, setEndDate] = useState<Date | null | undefined>()

    useEffect(() => {
            let startDateFormatted: string, endDateFormatted: string;
            if (startDate === null || startDate === undefined) {
                startDateFormatted = ''
            } else {
                startDateFormatted = formatYyyy_Mm_Dd(startDate)
            }
            if (endDate === null || endDate === undefined) {
                endDateFormatted = ''
            } else {
                endDateFormatted = formatYyyy_Mm_Dd(endDate)
            }
            setSearchCondition((prevState: any) => ({
                ...prevState,
                startDate: startDateFormatted,
                endDate: endDateFormatted
            }))
        }
    , [startDate, endDate])

    return <Stack horizontal>
            <DatePicker
            className={controlClass.control}
            label="조회 시작일"
            firstDayOfWeek={DayOfWeek.Sunday}
            value={startDate === null ? undefined : startDate}
            strings={DayPickerStrings}
            showGoToToday={false}
            placeholder="날짜를 선택하세요..."
            ariaLabel="날짜 선택"
            formatDate={formatYyyy_Mm_Dd}
            onSelectDate={date => setStartDate(date)}
        />
        <span style={tildeStyle}>~</span>
        <DatePicker
            className={controlClass.control}
            label="조회 종료일"
            showGoToToday={false}
            value={endDate === null ? undefined : endDate}
            firstDayOfWeek={DayOfWeek.Sunday}
            strings={DayPickerStrings}
            placeholder="날짜를 선택하세요..."
            ariaLabel="날짜 선택"
            formatDate={formatYyyy_Mm_Dd}
            onSelectDate={date => setEndDate(date)}
        />
    </Stack>
}