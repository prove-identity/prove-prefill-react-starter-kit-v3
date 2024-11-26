import { Stack, Typography } from '@mui/material';

const ResultPage = ({ status }: { status: "success" | "failure"}) => {
    // Determine the text and image based on the status
    const isSuccess = status === 'success';
    const title = isSuccess ? "Congratulations" : "Verification Completed";
    const message = isSuccess ? "Identity Verified" : "Identity could not be verified";
    const imageSrc = isSuccess ? "/img/success.png" : "/img/failure.png";

    return (
        <Stack alignItems="center" gap={2} className="fadeIn">
            <Stack alignItems="center" gap={1}>
                <Typography component="h1" variant="h4" fontWeight="bold">{title}</Typography>
                <Typography variant="body1" fontSize="1.4rem">{message}</Typography>
            </Stack>
            <img className="fadeIn" width={70} height={70} src={imageSrc} />
        </Stack>
    );
}

export default ResultPage;