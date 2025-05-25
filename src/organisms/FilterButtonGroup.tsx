import { ButtonGroup, Icon } from '@rneui/themed';
import { AppText } from "src/atoms/AppText"

type ButtonGroupProps = {
  selectedFilter: Array<number>,
  setSelectedFilter: (i: Array<number>) => void
}

export const FilterButtonGroup = (props: ButtonGroupProps) => {

  return <ButtonGroup
    selectMultiple
    containerStyle={{
      alignItems: 'flex-start',
      marginLeft: 15,
    }}
    buttonStyle={{ padding: 10 }}
    disabledStyle={{ width: 20 }}
    selectedButtonStyle={{ backgroundColor: '#e2e2e2' }}
    disabled={[0]}
    buttons={[
      <Icon
        name="filter"
        type="font-awesome-5"
        size={16}
        style={{ paddingLeft: 0, paddingRight: 0, flex: 0, width: 30 }}
      />,
      <AppText style={{ width: 200 }}>Credit</AppText>,
      <AppText style={{ width: 200 }}>Debit</AppText>,
    ]}
    selectedIndexes={props.selectedFilter}
    onPress={(selectedIndexes: Array<number>) => {
      if (!selectedIndexes.length) {
        props.setSelectedFilter([])
      }

      const _currentSelection = props.selectedFilter[0]
      const _selectedIndexes = selectedIndexes.concat()
      if (props.selectedFilter.includes(_currentSelection)) {
        _selectedIndexes.splice(
          _selectedIndexes.indexOf(_currentSelection),
          1
        )
      }

      props.setSelectedFilter(_selectedIndexes)
    }}
  />;
}
