import { Alert, Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import dynamic from 'next/dynamic';
import React from 'react';
import { DIFFICULTIES } from '@constants/config';
import { useTranslation } from 'react-i18next';
import { durationForValue, formatK, kToKM } from '@utils/Utils';

const GaugeComponent: any = dynamic(() => import('react-gauge-component'), { ssr: false });

export interface MiningDifficultyProps {
  poolUrl: string;
}

const MiningDifficulty: React.FC<MiningDifficultyProps> = ({ poolUrl }) => {
  const { t } = useTranslation();
  const [selected, setSelected] = React.useState<string>(''); // empty => -p x

  const selectedIndex = React.useMemo(() => {
    const idx = DIFFICULTIES.findIndex((d) => d.id === selected);
    return idx === -1 ? 0 : idx;
  }, [selected]);

  const current = DIFFICULTIES[selectedIndex] ?? DIFFICULTIES[0];
  const duration = durationForValue(current.difficulty);
  const k = current.difficulty / 1000;
  const percent = Math.max(0, Math.min(100, ((k - 1) / (9900 - 1)) * 100));

  const command = `ccminer -a scrypt -o ${poolUrl} -u YourWalletAddress.WorkerName -p ${selected || 'x'}`;

  const percentForDiff = (diff: number) => {
    const kv = diff / 1000;
    return Math.max(0, Math.min(100, ((kv - 1) / (9900 - 1)) * 100));
  };

  const percentToDiff = (p: number) => {
    const kv = 1 + (p / 100) * (9900 - 1);
    return Math.round(kv) * 1000;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 16 / 8 }}>
      <Box sx={{ width: '100%', maxWidth: 520, mx: 'auto' }}>
        <Alert severity="info">{t('miningConfiguration.workerReminder')}</Alert>
      </Box>
      {/* Gauge (react-gauge-component) */}
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 520 }}>
          <GaugeComponent
            type="semicircle"
            value={percent}
            minValue={0}
            maxValue={100}
            animationDuration={duration * 1000}
            arc={{
              gradient: true,
              width: 0.15,
              padding: 0,
              colorArray: ['#9fdffd', '#0e52d1'],
              subArcs: [
                { limit: 25, showTick: true },
                { limit: 50, showTick: true },
                { limit: 75, showTick: true },
                { limit: 100, showTick: true }
              ]
            }}
            labels={{
              valueLabel: {
                style: {
                  fontWeight: 500,
                  fontSize: '30px',
                  fill: '#252525',
                  textShadow: 'unset'
                },
                // Full difficulty with thousand separators
                formatTextValue: () => formatK(current.difficulty)
              },
              tickLabels: {
                type: 'outer',
                ticks: [
                  { value: percentForDiff(1000) },
                  { value: percentForDiff(1_000_000) },
                  { value: percentForDiff(1_500_000) },
                  { value: percentForDiff(2_000_000) },
                  { value: percentForDiff(3_000_000) },
                  { value: percentForDiff(3_500_000) },
                  { value: percentForDiff(4_000_000) },
                  { value: percentForDiff(4_500_000) },
                  { value: percentForDiff(5_500_000) },
                  { value: percentForDiff(6_000_000) },
                  { value: percentForDiff(6_500_000) },
                  { value: percentForDiff(7_000_000) },
                  { value: percentForDiff(8_000_000) },
                  { value: percentForDiff(8_500_000) },
                  { value: percentForDiff(9_000_000) },
                  { value: percentForDiff(9_500_000) },
                  { value: percentForDiff(9_900_000) }
                ],
                defaultTickValueConfig: {
                  formatTextValue: (p: number) => kToKM(percentToDiff(p) / 1000)
                }
              }
            }}
            pointer={{ type: 'arrow', elastic: false }}
          />
        </Box>
      </Box>

      {/* Selector */}
      <Box sx={{ width: '100%', maxWidth: 520, mx: 'auto' }}>
        <FormControl fullWidth size="small">
          <InputLabel id="difficulty-select-label">
            {t('miningConfiguration.difficultyLabel')}
          </InputLabel>
          <Select
            labelId="difficulty-select-label"
            label={t('miningConfiguration.difficultyLabel')}
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            MenuProps={{ PaperProps: { style: { maxHeight: 320 } } }}>
            {DIFFICULTIES.map((d) => (
              <MenuItem key={d.id} value={d.id}>
                {d.id} — {formatK(d.difficulty)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Example label */}
      <Box sx={{ width: '100%', mx: 'auto', mt: 2, fontWeight: 600 }}>
        {t('miningConfiguration.example')}
      </Box>

      {/* Command (full width) */}
      <Box
        component="pre"
        sx={{
          width: '100%',
          whiteSpace: 'pre-wrap',
          overflow: 'auto',
          wordBreak: 'normal',
          bgcolor: '#f5f5f5',
          p: 2,
          borderRadius: 1,
          fontSize: '0.875rem'
        }}>
        {command}
      </Box>
    </Box>
  );
};

export default MiningDifficulty;
