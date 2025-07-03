import { Box, Paper, Card, Button, InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PRIMARY_BLUE, SECONDARY_GREY_2, PRIMARY_RED } from '@styles/colors';
import FlcIcon from '@components/icons/FlcIcon';
import { useTranslation, Trans } from 'react-i18next';
import {
  FISHING_POOL_URL,
  FISHING_POOL_FEE,
  SOLO_POOL_URL,
  SOLO_POOL_FEE
} from '@constants/config';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { validateAddress } from '@utils/Utils';
import {
  AddressInput,
  AddressIconWrapper,
  StyledAddressInputBase
} from '@components/styled/AddressInput';

const StyledCard = styled(Card)(() => ({
  borderRadius: 8,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
  border: 'unset',
  marginBottom: 20
}));

const StyledPaper = styled(Paper)(() => ({
  borderRadius: 2
}));

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'bold',
  color: PRIMARY_BLUE,
  backgroundColor: SECONDARY_GREY_2,
  padding: '0 16px',
  height: 70,
  fontSize: '1.2rem'
}));

const SectionHeader = styled(Box)(() => ({
  borderBottom: `2px solid ${PRIMARY_BLUE}`,
  padding: '10px 5px',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  marginBottom: '1rem',
  color: PRIMARY_BLUE
}));

interface InfoRowProps {
  noBorder?: boolean;
}

const InfoRow = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'noBorder'
})<InfoRowProps>(({ noBorder }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  padding: '10px 5px',
  borderBottom: noBorder ? 'none' : '1px dashed #eee'
}));

const validationSchema = Yup.object().shape({
  address: Yup.string()
    .required('Address is required')
    .matches(/^[a-zA-Z0-9]{30,}$/, 'Invalid address format')
    .test('is-valid-address', 'Invalid address', (value) => {
      return validateAddress(value, 'mainnet');
    })
});

interface ConnectFormData {
  address: string;
}

const MiningPage = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ConnectFormData>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit: SubmitHandler<ConnectFormData> = (data) => {
    window.location.href = `https://shares.fpool.net/address/${data.address}`;
  };

  const faqItems = t('faq.questions', { returnObjects: true }) as any[];

  return (
    <Box sx={{ maxWidth: '1200px', minWidth: { md: '900px' }, mx: 'auto', py: 1, mb: 3 }}>
      <StyledCard>
        <Box component="section" sx={{ py: 2, px: { md: 2 } }}>
          <SectionHeader>{t('miningInstructions.title')}</SectionHeader>
          <Box component="div" sx={{ display: 'flex', flexWrap: 'wrap', mb: 3 }}>
            {/* Fishing Pool */}
            <Box
              component="div"
              sx={{
                flexGrow: 1,
                flexBasis: { xs: '100%', md: '50%' },
                p: 1
              }}>
              <StyledPaper>
                <StyledBox>
                  <FlcIcon sx={{ width: 25, height: 50 }} />
                  {t('miningInstructions.fishingPool.title')}
                </StyledBox>
                <Box sx={{ padding: 1 }}>
                  <InfoRow>
                    <Box sx={{ mr: 2, fontWeight: 700 }}>{t('miningInstructions.miningUrl')}:</Box>
                    <Box textAlign="right">{FISHING_POOL_URL}</Box>
                  </InfoRow>
                  <InfoRow>
                    <Box sx={{ mr: 2, fontWeight: 700 }}>
                      {t('miningInstructions.paymentType')}:
                    </Box>
                    <Box textAlign="right">{t('miningInstructions.fishingPool.paymentType')}</Box>
                  </InfoRow>
                  <InfoRow>
                    <Box sx={{ mr: 2, fontWeight: 700 }}>{t('miningInstructions.poolFee')}:</Box>
                    <Box textAlign="right">{FISHING_POOL_FEE}%</Box>
                  </InfoRow>
                  <InfoRow>
                    <Box sx={{ mr: 2, fontWeight: 700 }}>
                      {t('miningInstructions.payoutCondition')}:
                    </Box>
                    <Box textAlign="right">
                      {t('miningInstructions.fishingPool.payoutCondition')}
                    </Box>
                  </InfoRow>
                  <InfoRow noBorder>
                    <Box sx={{ mr: 2, fontWeight: 700 }}>{t('miningInstructions.minPayout')}:</Box>
                    <Box textAlign="right">{t('miningInstructions.fishingPool.minPayout')}</Box>
                  </InfoRow>
                </Box>
              </StyledPaper>

              <StyledPaper sx={{ p: 2, mt: 2, textAlign: 'center' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <AddressInput>
                    <AddressIconWrapper>
                      <AccountBalanceWalletIcon />
                    </AddressIconWrapper>
                    <StyledAddressInputBase
                      placeholder={t('miningInstructions.fishingPool.enterAddress')}
                      {...register('address')}
                      autoComplete="off"
                    />
                  </AddressInput>
                  {errors.address && <p style={{ color: PRIMARY_RED }}>{errors.address.message}</p>}
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!!errors.address}
                    sx={{ mt: 1 }}>
                    {t('miningInstructions.fishingPool.myShares')}
                  </Button>
                </form>
              </StyledPaper>
            </Box>

            {/* Solo Pool */}
            <Box
              component="div"
              sx={{
                flexGrow: 1,
                flexBasis: { xs: '100%', md: '50%' },
                p: 1
              }}>
              <StyledPaper>
                <StyledBox>{t('miningInstructions.soloPool.title')}</StyledBox>
                <Box sx={{ padding: 1 }}>
                  <InfoRow>
                    <Box sx={{ mr: 2, fontWeight: 700 }}>{t('miningInstructions.miningUrl')}:</Box>
                    <Box textAlign="right">{SOLO_POOL_URL}</Box>
                  </InfoRow>
                  <InfoRow>
                    <Box sx={{ mr: 2, fontWeight: 700 }}>
                      {t('miningInstructions.paymentType')}:
                    </Box>
                    <Box textAlign="right">{t('miningInstructions.soloPool.paymentType')}</Box>
                  </InfoRow>
                  <InfoRow>
                    <Box sx={{ mr: 2, fontWeight: 700 }}>{t('miningInstructions.poolFee')}:</Box>
                    <Box textAlign="right">{SOLO_POOL_FEE}%</Box>
                  </InfoRow>
                  <InfoRow>
                    <Box sx={{ mr: 2, fontWeight: 700 }}>
                      {t('miningInstructions.payoutCondition')}:
                    </Box>
                    <Box textAlign="right">{t('miningInstructions.soloPool.payoutCondition')}</Box>
                  </InfoRow>
                  <InfoRow noBorder>
                    <Box sx={{ mr: 2, fontWeight: 700 }}>{t('miningInstructions.minPayout')}:</Box>
                    <Box textAlign="right">{t('miningInstructions.soloPool.minPayout')}</Box>
                  </InfoRow>
                </Box>
              </StyledPaper>
            </Box>
          </Box>
        </Box>
      </StyledCard>

      {/* Mining Configuration */}
      <StyledCard>
        <Box component="section" sx={{ p: 2 }}>
          <SectionHeader>{t('miningConfiguration.title')}</SectionHeader>
          <Box component="div" sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Box component="span" sx={{ fontWeight: 'bold', pr: 1, pb: 1 }}>
              {t('miningConfiguration.usernameFormat')}
            </Box>
            <Box>{t('miningConfiguration.usernameFormatValue')}</Box>
          </Box>
          <Box component="div" sx={{ mt: 2, mb: 1 }}>
            <Box component="span" sx={{ fontWeight: 'bold' }}>
              {t('miningConfiguration.example')}
            </Box>
          </Box>
          <Box
            component="pre"
            sx={{
              whiteSpace: 'pre-wrap',
              overflow: 'auto',
              wordBreak: 'normal',
              bgcolor: '#f5f5f5',
              padding: 2,
              borderRadius: 1,
              fontSize: '0.875rem'
            }}>
            {t('miningConfiguration.command', { url: FISHING_POOL_URL })}
          </Box>
        </Box>
      </StyledCard>

      {/* Payment Instructions */}
      <StyledCard>
        <Box component="section" sx={{ p: 2 }}>
          <SectionHeader>{t('paymentInstructions.title')}</SectionHeader>
          <Box component="div">{t('paymentInstructions.detail')}</Box>
          <Box component="div" sx={{ mt: 2 }}>
            <Box component="strong">{t('paymentInstructions.poolMinersHeader')}</Box>
            {t('paymentInstructions.poolMinersDetail')}
          </Box>
          <Box component="div" sx={{ mt: 1 }}>
            <Box component="strong">{t('paymentInstructions.soloMinersHeader')}</Box>
            {t('paymentInstructions.soloMinersDetail')}
          </Box>
          <Box component="div" sx={{ mt: 1 }}>
            <Box component="strong">{t('paymentInstructions.importantHeader')}</Box>
            {t('paymentInstructions.importantDetail')}
          </Box>
        </Box>
      </StyledCard>

      {/* FAQ */}
      <StyledCard>
        <Box component="section" sx={{ p: 2 }}>
          <SectionHeader>{t('faq.title')}</SectionHeader>
          {faqItems.map((faq: any, index: number) => (
            <Box key={index} sx={{ mb: 3, pb: 2, borderBottom: '1px dashed #eee' }}>
              <Box sx={{ fontSize: '1.1em', color: '#333', mb: 1, fontWeight: 'bold' }}>
                {faq.q}
              </Box>
              <Box sx={{ color: 'text.secondary', ml: 2 }}>{faq.a}</Box>
            </Box>
          ))}
        </Box>
      </StyledCard>

      {/* Support */}
      <StyledCard>
        <Box component="section" sx={{ p: 2 }}>
          <SectionHeader>{t('support.title')}</SectionHeader>
          <Box component="div">
            <Trans i18nKey="support.detail">
              Need support? Join the
              <a
                href="https://flokicoin.org/discord"
                target="_blank"
                rel="noopener"
                style={{ textDecoration: 'none', color: PRIMARY_BLUE, fontWeight: 'bold' }}>
                #mining
              </a>
              channel on the Flokicoin Discord server, or DM us directly at
              <a
                href="https://discord.com/users/1206022379956863068"
                target="_blank"
                rel="noopener"
                style={{ textDecoration: 'none', color: PRIMARY_BLUE, fontWeight: 'bold' }}>
                Fpool
              </a>
              .
            </Trans>
          </Box>
        </Box>
      </StyledCard>
    </Box>
  );
};

export default MiningPage;
