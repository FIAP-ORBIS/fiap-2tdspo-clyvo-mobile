import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IPet } from '../interfaces/IPet';
import { petCardStyles as s } from '../styles/components/pet-card.styles';

interface PetCardProps {
  pet: IPet;
  onPress: () => void;
  status?: 'ok' | 'attention';
}

export function PetCard({ pet, onPress, status = 'ok' }: PetCardProps) {
  return (
    <TouchableOpacity style={s.card} onPress={onPress} activeOpacity={0.85}>
      <Text style={s.emoji}>{pet.emoji}</Text>
      <Text style={s.name}>{pet.nome}</Text>
      <Text style={s.info}>{pet.raca} · {pet.idade}</Text>
      <View style={status === 'attention' ? s.badgeAttention : s.badgeOk}>
        <Text style={status === 'attention' ? s.badgeTextAttention : s.badgeTextOk}>
          {status === 'attention' ? 'Atenção' : 'Ok'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default PetCard;
