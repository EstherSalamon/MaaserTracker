import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Autocomplete, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';

const AddIncomePage = () => {
    const [sources, setSources] = useState([]);
    const [source, setSource] = useState({});
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());

    useEffect(() => {

        const loadData = async () => {
            const { data } = await axios.get('/api/moneys/get-s');
            setSources(data);
        };

        loadData();

    }, []);

    const onButtonClick = async () => {
        const theSource = sources.find(s => s.name === source);
        const income = {
            sourceName: source,
            sourceId: theSource.id,
            amount,
            date
        };
        await axios.post('/api/moneys/add-i', { Income: income });
        window.location.href = '/income';
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Income
            </Typography>
            <Autocomplete
                disablePortal
                options={sources}
                getOptionLabel={(option) => option.name}
                fullWidth
                inputValue={source}
                onInputChange={(e, newOne) => setSource(newOne) }
                renderInput={(params) => <TextField {...params} label="Source" />}
            />
            <TextField
                label="Amount"
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                fullWidth
                margin="normal"
                value={amount}
                onChange={e => setAmount(e.target.value) }
            />
             <TextField
                label="Date"
                type="date"
                value={dayjs(date).format('YYYY-MM-DD')}
                onChange={e => setDate(e.target.value)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
            />
            <Button variant="contained" color="primary" disabled={!(source && amount && date) } onClick={onButtonClick }>Add Income</Button>
        </Container>
    );
}

export default AddIncomePage;
