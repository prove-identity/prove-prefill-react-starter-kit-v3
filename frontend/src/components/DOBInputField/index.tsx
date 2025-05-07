import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface DOBInputFieldProps {
    dob: Dayjs | null;
    onDOBChanged: (newDOB: Dayjs | null) => void;
    dobError: boolean;
    errorText?: string;
    showErrorText?: boolean;
    label?: string;
    fontSize?: 'normal' | 'large';
    hideOutline?: boolean;
    disabled?: boolean;
}

const DOBInputField = (props: DOBInputFieldProps) => {
    const dob = props.dob ? dayjs(props.dob) : null;
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={props.label}
                format="MM/DD/YYYY"
                value={dob}
                onChange={props.onDOBChanged}
                disabled={props.disabled}
                slotProps={{
                    textField: {
                        error: props.dobError,
                        helperText: props.showErrorText && props.errorText ? props.errorText : null,
                        fullWidth: true,
                        variant: "outlined",
                        sx: {
                            '.MuiPickersToolbar-root': {
                                borderRadius: '12px',
                            },
                            '& .MuiOutlinedInput-input': {
                                fontWeight: 'bold',
                                fontSize: '1.5rem',
                            }
                        }
                    }
                }}
            />
        </LocalizationProvider>
    );
};

export default DOBInputField;
