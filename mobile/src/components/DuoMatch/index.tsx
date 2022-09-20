import { useState } from 'react';
import { View, Text, Modal, ModalProps, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from 'phosphor-react-native';
import * as Clipboard from 'expo-clipboard';

import { styles } from './styles';
import { THEME } from '../../theme';

import { Heading } from '../Heading';

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({discord, onClose, ...rest}: Props) {
  const [isCopping, setIsCopping] = useState(false);

  async function handleCopyDiscordUserToClipboard() {
    setIsCopping(true);
    await Clipboard.setStringAsync(discord);
    Alert.alert('Copiado!', 'O usuário foi copiado para você usar no Discord.');
    setIsCopping(false);
  }

  return (
    <Modal transparent statusBarTranslucent animationType='fade' {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons name='close' size={20} color={THEME.COLORS.CAPTION_500}/>
          </TouchableOpacity>
          <CheckCircle color={THEME.COLORS.SUCCESS} size={64} weight='bold'/>
          <Heading style={{ alignItems: 'center', marginTop: 24}} title='Let’s play!' subtitle='Agora é só começar a jogar!'/>
          <Text style={styles.label}>Adicione no Discord</Text>
          <TouchableOpacity style={styles.discordButton} onPress={handleCopyDiscordUserToClipboard} disabled={isCopping}>
            <Text style={styles.discord}>{isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}