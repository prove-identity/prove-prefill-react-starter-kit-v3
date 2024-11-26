import { Grid, MenuItem, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { US_STATES } from '../../util/states';
import FormTextInput from '../FormTextInput';
import { Controller, Control } from 'react-hook-form';

export interface AddressInputProps {
    control: Control<any>;
    onRegionChanged: (e: any) => void;
}

const AddressInput = (props: AddressInputProps) => {
    const { t } = useTranslation();

    return (
        <Grid container gap={2}>
            <Grid item xs={12}>
                <FormTextInput
                    control={props.control}
                    name="address"
                    label={t('dataCollection.address.label')}
                    type="text"
                />
            </Grid>
            <Grid item xs={12}>
                <FormTextInput
                    control={props.control}
                    name="extendedAddress"
                    label={t('dataCollection.extendedAddress.label')}
                    type="text"
                />
            </Grid>
            <Grid item xs={12}>
                <FormTextInput
                    control={props.control}
                    name="city"
                    label={t('dataCollection.city.label')}
                    type="text"
                />
            </Grid>
            <Grid display={'flex'} gap={2} xs={12} item>
                <Controller
                    name="region"
                    control={props.control}
                    render={({ field: { ref: fieldRef, value, onChange, ...fieldProps }, fieldState: { error = undefined } }) => (
                        <TextField
                            label={t('dataCollection.region.label')}
                            select
                            value={value}
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                sx: {
                                    borderRadius: '12px',
                                    '.MuiInputBase-input': {
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                        paddingLeft: '16px',
                                    },
                                },
                                disableUnderline: true,
                            }}
                            InputLabelProps={{
                                shrink: true,
                                style: { fontSize: '1.2rem' },
                            }}
                            onChange={(e) => {
                                onChange(e);
                                props.onRegionChanged(e);
                            }}
                            error={!!error}
                            helperText={error ? t('dataCollection.region.errorText') : null}
                            {...fieldProps}
                        >
                            {US_STATES.map(state => (
                                <MenuItem key={state.shortCode} value={state.shortCode} sx={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
                                    {state.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />
                <FormTextInput
                    control={props.control}
                    name="postalCode"
                    label={t('dataCollection.postalCode.label')}
                    type="text"
                    maxLength={5}
                />
            </Grid>
        </Grid>
    );
}

export default AddressInput;
