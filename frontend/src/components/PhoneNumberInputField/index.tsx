import { MuiTelInput, } from 'mui-tel-input';
import { styled } from '@mui/material';
import { Controller } from 'react-hook-form';

const RoundTelInput = styled(MuiTelInput)(({ theme }) => ({
    width: '100%',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
    'fieldset': {
        borderRadius: '12px',
    },
    'input': {
        fontSize: '1.5rem',
    },
}));

const PhoneNumberInputField = ({ control, name, label, disableOutline, hideCountryCodeInfo }: any) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { ref: fieldRef, value, onChange, ...fieldProps }, fieldState: { error = undefined } }) => (
                <RoundTelInput
                    label={label}
                    variant={disableOutline ? 'standard' : 'outlined'}
                    disableDropdown
                    forceCallingCode
                    fullWidth
                    defaultCountry="US"
                    onlyCountries={['US']}
                    value={value}
                    onChange={(value, info) => onChange(info.numberValue)}
                    error={!!error}
                    inputProps={{
                        style: {
                            fontWeight: 'bold',
                            boxShadow: "1",
                        }
                    }}
                    sx={{
                        // Font size of the country code
                        '&.MuiTelInput-TextField p.MuiTypography-root.MuiTypography-body1': {
                            fontSize: '1.4rem'
                        },
                        '&.MuiTelInput-TextField div.MuiInputAdornment-root': {
                            display: hideCountryCodeInfo ? 'none' : 'flex'
                        }
                    }}
                    {...fieldProps}
                />
            )}
        />
    );
};

export default PhoneNumberInputField;
