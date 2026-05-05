'use client';
import {
  Box, Container, Typography, TextField, Button, Card, CardContent,
  Stepper, Step, StepLabel, Chip, Grid, Alert, CircularProgress,
  Stack, Divider, Dialog, DialogContent, DialogTitle, IconButton,
  Avatar, Table, TableBody, TableRow, TableCell, Paper
} from '@mui/material';
import {
  Search, LocalShipping, CheckCircle, Payment, Close,
  AccessTime, Warning, QrCode
} from '@mui/icons-material';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import axios from 'axios';
import Navbar from '@/components/ui/Navbar';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const STEPS = ['incheon','tianjin','erlian','zamiin_uud','customs','warehouse','delivering','delivered'] as const;

const STATUS_COLORS: Record<string, 'default'|'primary'|'warning'|'success'|'error'> = {
  incheon: 'default', tianjin: 'default', erlian: 'primary',
  zamiin_uud: 'primary', customs: 'warning', warehouse: 'warning',
  delivering: 'primary', delivered: 'success',
};

export default function TrackPage() {
  const t = useTranslations('track');
  const ts = useTranslations('status');
  const tc = useTranslations('cargoType');
  const locale = useLocale();

  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [qpayData, setQpayData] = useState<any>(null);
  const [payDialog, setPayDialog] = useState(false);
  const [payLoading, setPayLoading] = useState(false);

  const search = async () => {
    if (!code && !phone) return;
    setLoading(true); setError(''); setResult(null);
    try {
      const { data } = await axios.get(`${API}/parcels/track`, { params: { code, phone } });
      setResult(data);
    } catch (err: any) {
      setError(t('notFound'));
    } finally { setLoading(false); }
  };

  const openPayment = async (parcel: any) => {
    setPayLoading(true); setPayDialog(true);
    try {
      const { data } = await axios.post(`${API}/payments/invoice`, { parcel_id: parcel.id });
      setQpayData(data);
    } catch {
      setQpayData(null);
    } finally { setPayLoading(false); }
  };

  const checkPaid = async (parcel: any) => {
    if (!qpayData?.invoice_id) return;
    try {
      const { data } = await axios.get(`${API}/payments/check/${qpayData.invoice_id}`);
      if (data.paid) {
        setPayDialog(false);
        await search();
      }
    } catch {}
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Container maxWidth="md" sx={{ pt: 14, pb: 8 }}>
        <Box textAlign="center" mb={5}>
          <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2, width: 64, height: 64 }}>
            <LocalShipping sx={{ fontSize: 36 }} />
          </Avatar>
          <Typography variant="h4" fontWeight={800} gutterBottom>{t('title')}</Typography>
          <Typography color="text.secondary">{t('subtitle')}</Typography>
        </Box>

        {/* Search */}
        <Card sx={{ mb: 4, border: '1px solid', borderColor: 'divider' }}>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={12} sm={5}>
                <TextField fullWidth label={t('code')} value={code}
                  onChange={e => setCode(e.target.value)}
                  placeholder="MN240101XXXX"
                  onKeyDown={e => e.key === 'Enter' && search()}
                  InputProps={{ startAdornment: <LocalShipping sx={{ mr: 1, color: 'text.secondary' }} /> }}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField fullWidth label={t('phone')} value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="99XXXXXX"
                  onKeyDown={e => e.key === 'Enter' && search()}
                  InputProps={{ startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} /> }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button fullWidth variant="contained" size="large"
                  onClick={search} disabled={loading}
                  sx={{ height: 56 }}>
                  {loading ? <CircularProgress size={22} color="inherit" /> : t('search')}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        {result?.parcels?.map((parcel: any) => {
          const stepIndex = STEPS.indexOf(parcel.status);
          const storageFee = parcel.current_storage_fee || 0;
          const totalDue = (parcel.remaining_fee || 0) + storageFee;

          return (
            <Card key={parcel.id} sx={{ mb: 4, border: '2px solid', borderColor: parcel.is_paid ? 'success.main' : 'divider' }}>
              <CardContent sx={{ p: 4 }}>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={3}>
                  <Box>
                    <Typography variant="h6" fontWeight={800}>{parcel.tracking_code}</Typography>
                    <Stack direction="row" spacing={1} mt={0.5}>
                      <Chip size="small" label={ts(parcel.status)} color={STATUS_COLORS[parcel.status]} />
                      <Chip size="small" label={tc(parcel.cargo_type)} variant="outlined" />
                    </Stack>
                  </Box>
                  {parcel.is_paid
                    ? <Chip icon={<CheckCircle />} label={t('paid')} color="success" />
                    : totalDue > 0 && (
                      <Button variant="contained" color="error" size="small"
                        startIcon={<Payment />} onClick={() => openPayment(parcel)}>
                        {t('payNow')}
                      </Button>
                    )
                  }
                </Stack>

                {/* Stepper */}
                <Box sx={{ overflowX: 'auto', pb: 1 }}>
                  <Stepper activeStep={stepIndex} alternativeLabel sx={{ minWidth: 600 }}>
                    {STEPS.map(step => (
                      <Step key={step}>
                        <StepLabel>{ts(step)}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" fontWeight={700} gutterBottom>{t('parcelInfo')}</Typography>
                    <Table size="small">
                      <TableBody>
                        {[
                          [t('receiver'), parcel.mn_name],
                          [t('phone'), parcel.mn_phone],
                          [t('quantity'), `${parcel.quantity} ширхэг`],
                          [t('type'), tc(parcel.cargo_type)],
                          parcel.batch_code && ['Багц', parcel.batch_code],
                        ].filter(Boolean).map(([k,v]: any) => (
                          <TableRow key={k}>
                            <TableCell sx={{ color: 'text.secondary', border: 0, py: 0.5, pl: 0 }}>{k}</TableCell>
                            <TableCell sx={{ fontWeight: 600, border: 0, py: 0.5 }}>{v}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" fontWeight={700} gutterBottom>{t('payment')}</Typography>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                      <Stack spacing={1}>
                        {[
                          ['Солонгосд төлсөн', `${(parcel.paid_in_korea||0).toLocaleString()}₮`],
                          [t('remaining'), `${(parcel.remaining_fee||0).toLocaleString()}₮`, parcel.remaining_fee > 0 ? 'error.main' : 'text.primary'],
                          storageFee > 0 && [t('storageFee'), `${storageFee.toLocaleString()}₮`, 'warning.main'],
                        ].filter(Boolean).map(([k,v,color]: any) => (
                          <Stack key={k} direction="row" justifyContent="space-between">
                            <Typography variant="body2" color="text.secondary">{k}</Typography>
                            <Typography variant="body2" fontWeight={700} color={color || 'text.primary'}>{v}</Typography>
                          </Stack>
                        ))}
                        {storageFee > 0 && (
                          <>
                            <Divider />
                            <Stack direction="row" justifyContent="space-between">
                              <Typography fontWeight={700}>{t('total')}</Typography>
                              <Typography fontWeight={800} color="error.main">{totalDue.toLocaleString()}₮</Typography>
                            </Stack>
                          </>
                        )}
                      </Stack>
                    </Paper>

                    {storageFee > 0 && (
                      <Alert severity="warning" icon={<Warning />} sx={{ mt: 1.5, borderRadius: 2 }}>
                        Агуулахын хадгалалтын төлбөр нэмэгдэж байна!
                      </Alert>
                    )}
                  </Grid>
                </Grid>

                {/* History */}
                {result.history?.length > 0 && (
                  <Box mt={3}>
                    <Typography variant="subtitle2" fontWeight={700} gutterBottom>{t('history')}</Typography>
                    <Stack spacing={1}>
                      {result.history.filter((h: any) => result.parcels.some((p:any) => p.id === h.parcel_id || true)).slice(0, 8).map((h: any, i: number) => (
                        <Stack key={i} direction="row" spacing={2} alignItems="center">
                          <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Chip size="small" label={ts(h.status)} color={STATUS_COLORS[h.status]} />
                          <Typography variant="caption" color="text.secondary">
                            {new Date(h.created_at).toLocaleString(locale === 'ko' ? 'ko-KR' : 'mn-MN')}
                          </Typography>
                          {h.note && <Typography variant="caption">{h.note}</Typography>}
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                )}
              </CardContent>
            </Card>
          );
        })}
      </Container>

      {/* QPay Dialog */}
      <Dialog open={payDialog} onClose={() => setPayDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography fontWeight={700}>QPay төлбөр</Typography>
          <IconButton onClick={() => setPayDialog(false)}><Close /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 4 }}>
          {payLoading ? (
            <CircularProgress sx={{ my: 4 }} />
          ) : qpayData ? (
            <Stack spacing={3} alignItems="center">
              <Alert severity="info">QPay апп-аар QR кодыг скан хийж төлнө үү</Alert>
              {qpayData.qr_image && (
                <Box component="img" src={`data:image/png;base64,${qpayData.qr_image}`}
                  sx={{ width: 220, height: 220, borderRadius: 2, border: '2px solid', borderColor: 'divider' }} />
              )}
              <Typography variant="h5" fontWeight={800} color="error.main">
                {(qpayData.amount || 0).toLocaleString()}₮
              </Typography>
              <Button variant="contained" startIcon={<QrCode />} size="large">
                QPay апп нээх
              </Button>
              <Button variant="outlined" onClick={() => checkPaid(null)}>
                Төлбөр шалгах
              </Button>
            </Stack>
          ) : (
            <Alert severity="error">QPay холболт амжилтгүй болж. Дараа дахин оролдоно уу.</Alert>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
