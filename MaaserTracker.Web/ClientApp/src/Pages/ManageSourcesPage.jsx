import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageSourcesPage = () => {
    const [sources, setSources] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedSource, setSelectedSource] = useState('');
    const [editingSource, setEditingSource] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const loadData = async () => {
        const { data } = await axios.get('/api/moneys/get-s');
        setSources(data);
    };

    useEffect(() => {

        loadData();

    }, []);

    const handleOpen = (source) => {
        setOpen(true);
        setSelectedSource(source ? source.name : '');
        setEditingSource(source);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedSource('');
        setEditingSource(null);
    };

    const handleAddEdit = async () => {
        if (editingSource) {
            const source = { ...editingSource, name: selectedSource };
            await axios.post('/api/moneys/update-s', { source });
        } else {
            await axios.post('/api/moneys/add-s', { Source: { Name: selectedSource } });
        }

        handleClose();
        loadData();
    };

    const handleDelete = (source) => {
        setEditingSource(source);
        if (source.incomes.length) {
            setConfirmOpen(true);
        } else {
            handleConfirmClose(source);
        }
        
    };

    const handleConfirmClose = async (source) => {
        setConfirmOpen(false);
        const theSource = editingSource || source;
        await axios.post('/api/moneys/delete-s', { Source: theSource });
        loadData();
    };

    const onCancelClick = () => {
        setEditingSource(null);
        setConfirmOpen(false);
    }

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <Button onClick={() => handleOpen()} variant="contained" color="primary" sx={{ minWidth: '200px' }}>
                    Add Source
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                            <TableCell align="right" sx={{ fontSize: '18px' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sources.map(s => (
                            <TableRow key={s.id}>
                                <TableCell sx={{ fontSize: '18px' }}>{s.name}</TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>
                                    <Button color="primary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleOpen(s)}>Edit</Button>
                                    <Button color="secondary" variant="outlined" sx={{ margin: '0 5px' }} onClick={_ => handleDelete(s)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>{editingSource ? 'Edit Source' : 'Add Source'}</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Source" type="text" fullWidth value={selectedSource} onChange={(e) => setSelectedSource(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddEdit} color="primary">
                        {editingSource ? 'Save' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmOpen} onClose={handleConfirmClose} fullWidth maxWidth="sm">
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    This source has some income associated with it, are you sure you want to delete it?
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancelClick} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmClose} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default ManageSourcesPage;
