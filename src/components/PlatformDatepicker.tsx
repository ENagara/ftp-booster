import React, { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button, Datepicker, NativeDateService, I18nConfig } from '@ui-kitten/components';
import { AntDesign } from '@expo/vector-icons';

const i18n: I18nConfig = {
    dayNames: {
        short: ['日', '月', '火', '水', '木', '金', '土'],
        long: ['日', '月', '火', '水', '木', '金', '土'],
    },
    monthNames: {
        short: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        long: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    },
};
const dateService = new NativeDateService('ja', { i18n: i18n, format: 'YYYY/MM/DD' });

type Props = {
    selectDate: (date: Date) => void;
}

/**
 * プラットフォーム別Datepicker
 */
const PlatformDatepicker = ({ selectDate }: Props) => {
    if (Platform.OS === 'web') {
        return <WebCalendar selectDate={selectDate}></WebCalendar>
    } else {
        return <PhoneCalendar selectDate={selectDate}></PhoneCalendar>
    }
}

/**
 * Web用Datepicker
 */
const WebCalendar = ({ selectDate }: Props) => {
    const [date, setDate] = useState(new Date());

    const OnSelectDate = (date: Date) => {
        setDate(date);
        selectDate(date);
        console.log('日付を選択', date);
    }

    return (
        <Datepicker
            date={date}
            size='large'
            placeholder='Large'
            icon={CalendarIcon}
            onSelect={selectDate => OnSelectDate(selectDate)}
            dateService={dateService}
            min={new Date('2000-01-01')}
            max={new Date()}
        />
    );
}

/**
 * Phone用Datepicker
 */
const PhoneCalendar = ({ selectDate }: Props) => {
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        setDate(date);
        selectDate(date);
        hideDatePicker();
    };

    const getDateFormatString = () => {
        return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    }

    return (
        <>
            <Button onPress={showDatePicker}
                appearance='ghost'
                status='basic'
                size='large'
                style={styles.calendarButton}
            >
                {getDateFormatString()}
            </Button>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode='date'
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </>
    );
}

const CalendarIcon = () => <AntDesign name='calendar' size={32} />;

const styles = StyleSheet.create({
    calendarButton: {
        backgroundColor:'#f7f9fc'
    }
});

export default PlatformDatepicker;
