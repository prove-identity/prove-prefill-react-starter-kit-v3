import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const FormTextInput = ({ control, name, type, placeholder, label, startAdornment, maxLength, disabled = false }: any) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { ref: fieldRef, value, onChange, ...fieldProps }, fieldState: { error = undefined } }) => (
                <TextField
                    fullWidth   
                    helperText={error ? error.message : null}
                    onChange={onChange}
                    value={value}
                    error={!!error}
                    label={label}
                    variant="outlined"
                    disabled={disabled}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                            sx: {
                                fontSize: '1.2rem',
                            },
                        },
                        htmlInput: {
                            inputMode: type || 'text',
                            placeholder: placeholder,
                            maxLength: maxLength
                        },
                        input: {
                            sx: {
                                borderRadius: '12px',
                                '.MuiInputBase-input': {
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    paddingLeft: '16px',
                                },
                            },
                        startAdornment: startAdornment
                        }
                    }}
                    {...fieldProps}
                />
            )}
        />
    );
};

export default FormTextInput;
