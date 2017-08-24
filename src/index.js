/*
 * AJAX Quiz
 * - Vanilla Coding
*/

// $ 변수를 이용하여 jQuery를 사용합니다.
// 절대 지우지 마세요!
import $ from 'jquery';

/*
 * 사용할 수 있는 강아지 종류입니다.
 * 아래의 배열에 담겨있는 종의 강아지들을 사용자가 선택할 수 있도록 UI를 자유롭게 만들어 주세요.
 * HTML 파일에 마크업이 아닌, 여기 Javascript 파일내에서 UI를 만들수 있도록 코드를 만들어 주세요.
 */
var breeds = [
    'bulldog',
    'chihuahua',
    'collie',
    'corgi',
    'husky',
    'labrador',
    'poodle',
    'pug',
    'retriever',
    'shiba'
];

/*
 * AJAX 요청 보내기
 *
 * 사용자가 하나의 종을 선택했을때, 현재 페이지에 강아지 사진을 보여주세요.
 * 사용자가 다른 종을 선택하면, 사진을 교체해주세요.
 *
 * 강아지 사진 URL은 아래의 API에서 가져올 수 있습니다.
 * GET https://dog.ceo/api/breed/강아지종/images/random
 * (강아지종 - 위에 주어진 배열에 담긴 영문 String 값으로 교체해서 사용)
 *
 * 참고 API 문서: https://dog.ceo/dog-api/
 */

console.log('Hello, Ponyo!');
