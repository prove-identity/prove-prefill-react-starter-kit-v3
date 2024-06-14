import { Moment } from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField, TextFieldProps } from '@mui/material';

interface DOBInputFieldProps {
    dob: Moment | null;
    onDOBChanged: (newDOB: Moment | null) => void;
    dobError: boolean;
    errorText?: string;
    showErrorText?: boolean;
    label?: string;
    fontSize?: 'normal' | 'large';
    hideOutline?: boolean;
    disabled?: boolean;
}

const DOBInputField = (props: DOBInputFieldProps) => {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
                label={props.label}
                inputFormat="MM/DD/YYYY"
                value={props.dob}
                onChange={props.onDOBChanged}
                disabled={props.disabled}
                renderInput={(params: TextFieldProps) => (
                    <TextField
                        {...params}
                        error={props.dobError}
                        helperText={
                            props.showErrorText && props.errorText
                                ? props.errorText
                                : null
                        }
                        fullWidth
                        placeholder="MM/DD/YYYY"
                        sx={{
                            '.MuiPickersToolbar-root': {
                                borderRadius: '12px',
                            },
                            '& .MuiOutlinedInput-input': {
                                fontWeight: 'bold',
                                fontSize: '1.5rem',
                        }
                    }}
                        variant="outlined"
                    />
                )}
            />
        </LocalizationProvider>
    );
};

export default DOBInputField;
