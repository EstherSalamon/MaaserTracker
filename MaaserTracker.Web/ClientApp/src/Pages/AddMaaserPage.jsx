import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';

const AddMaaserPage =() => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());

    const onAddClick = async () => {
        const maaser = {
            recipient,
            amount,
            date
        };
        await axios.post('/api/moneys/add-m', { maaser });
        window.location.href = '/maaser';
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Maaser
            </Typography>
            <TextField label="Recipient" variant="outlined" fullWidth margin="normal" value={recipient} onChange={e => setRecipient(e.target.value) } />
            <TextField label="Amount" variant="outlined" fullWidth margin="normal" value={amount} onChange={e => setAmount(e.target.value) } />
            <TextField
                label="Date"
                type="date"
                value={dayjs(date).format('YYYY-MM-DD')}
                onChange={e => setDate(e.target.value)}
                
            />
            <Button variant="contained" color="primary" disabled={!(recipient && date && amount)} onClick={onAddClick}>Add Maaser</Button>
        </Container>
    );
}

export default AddMaaserPage;
