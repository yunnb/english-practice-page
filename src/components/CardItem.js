import {Card, EnglishText, Id, KoreanText, TextContainer} from "../styles/CardStyle";

const CONTENT = {
    sentence: {
        first: 'korean_text',
        second: 'english_text',
    },

    word: {
        first: 'word',
        second: 'meaning'
    }
}

const CardItem = ({data, type}) => {
    const {first, second} = CONTENT[type];

    return (
        <Card>
            <Id>{data.id}</Id>
            <TextContainer>
                <KoreanText>{data[first]}</KoreanText>
                <EnglishText>{data[second]}</EnglishText>
            </TextContainer>
        </Card>
    );
}

export default CardItem;