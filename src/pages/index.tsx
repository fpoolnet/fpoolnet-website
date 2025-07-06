import FlcIcon from '@components/icons/FlcIcon';
import {
  AddressIconWrapper,
  AddressInput,
  StyledAddressInputBase
} from '@components/styled/AddressInput';
import { FISHING_POOL_URL, SOLO_POOL_URL } from '@constants/config';
import { yupResolver } from '@hookform/resolvers/yup';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Box, Button, Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PRIMARY_BLUE, PRIMARY_GREY, PRIMARY_RED, SECONDARY_GREY_2 } from '@styles/colors';
import { validateAddress } from '@utils/Utils';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const StyledCard = styled(Card)(() => ({
  borderRadius: 8,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
  border: 'unset',
  marginBottom: 20
}));

const StyledCardBlock = styled(Card)(() => ({
  borderRadius: 8,
  border: '1px solid #ddd',
  boxShadow: 'unset'
}));

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'bold',
  color: PRIMARY_BLUE,
  backgroundColor: SECONDARY_GREY_2,
  padding: '0 15px',
  minHeight: 70,
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
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '10px 5px',
  borderBottom: noBorder ? 'none' : '1px dashed #eee',
  '& > :not(style) ~ :not(style)': {
    marginTop: '7px'
  },

  // Existing media query conditions
  '@media (min-width: 600px)': {
    flexDirection: 'row',
    '& > :not(style) ~ :not(style)': {
      marginTop: '0'
    }
  },

  // Ensure label stays on one line
  '> div:first-of-type': {
    whiteSpace: 'nowrap'
  }
}));
const validationSchema = Yup.object().shape({
  address: Yup.string()
    .required('Address is required')
    .matches(/^[a-zA-Z0-9]{30,}$/, 'Invalid address format')
    .test('is-valid-address', 'Invalid address', (value) => {
      return validateAddress(value);
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
    window.open(`https://shares.fpool.net/address/${data.address}`, '_blank');
  };

  const faqItems = t('faq.questions', { returnObjects: true }) as any[];
  const fishingPoolItems = t('miningInstructions.fishingPool.items', {
    returnObjects: true,
    url: FISHING_POOL_URL
  }) as any[];

  const soloPoolItems = t('miningInstructions.soloPool.items', {
    returnObjects: true,
    url: SOLO_POOL_URL
  }) as any[];

  const paymentInstructionsItems = t('paymentInstructions.items', {
    returnObjects: true
  }) as any[];

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
              <StyledCardBlock>
                <StyledBox>
                  <FlcIcon
                    sx={{ height: '21px', width: '15px', marginRight: '3px', marginBottom: '5px' }}
                  />
                  {t('miningInstructions.fishingPool.title')}
                </StyledBox>
                <Box sx={{ padding: 1 }}>
                  {fishingPoolItems.map((item, index) => (
                    <InfoRow key={index} noBorder={index === fishingPoolItems.length - 1}>
                      <Box sx={{ mr: 2, fontWeight: 700 }}>{item.label}:</Box>
                      <Box>{item.value}</Box>
                    </InfoRow>
                  ))}
                </Box>
                <StyledBox sx={{ backgroundColor: '#f8f9fa' }}>
                  <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ padding: '20px 0px', width: '100%' }}>
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
                    {errors.address && (
                      <Box sx={{ color: PRIMARY_RED, fontSize: '0.9rem', padding: 1 }}>
                        {errors.address.message}
                      </Box>
                    )}
                    <Button
                      type="submit"
                      variant="contained"
                      size="small"
                      disabled={!!errors.address}
                      sx={{ mt: 1, width: '100%', backgroundColor: '#007bff' }}>
                      {t('miningInstructions.fishingPool.myShares')}
                    </Button>
                  </Box>
                </StyledBox>
              </StyledCardBlock>
            </Box>

            {/* Solo Pool */}
            <Box
              component="div"
              sx={{
                flexGrow: 1,
                flexBasis: { xs: '100%', md: '50%' },
                p: 1
              }}>
              <StyledCardBlock>
                <StyledBox>{t('miningInstructions.soloPool.title')}</StyledBox>
                <Box sx={{ padding: 1 }}>
                  {soloPoolItems.map((item: any, index: number) => (
                    <InfoRow key={index} noBorder={index === soloPoolItems.length - 1}>
                      <Box sx={{ mr: 2, fontWeight: 700 }}>{item.label}:</Box>
                      <Box>{item.value}</Box>
                    </InfoRow>
                  ))}
                </Box>
              </StyledCardBlock>
            </Box>
          </Box>
          <Box sx={{ fontSize: '0.9em', color: PRIMARY_GREY, padding: 1 }}>
            {t('miningInstructions.note')}
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
        <Box component="section" sx={{ p: 2, color: '#333', lineHeight: 1.6 }}>
          <SectionHeader>{t('paymentInstructions.title')}</SectionHeader>
          <Box component="div">{t('paymentInstructions.summary')}</Box>

          {paymentInstructionsItems.map((item, index) => (
            <Box component="div" sx={{ mt: 2 }} key={index}>
              <Box component="strong">{item.label}</Box>
              {item.value}
            </Box>
          ))}
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
