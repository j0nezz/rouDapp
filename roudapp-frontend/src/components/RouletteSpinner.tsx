import React from "react";
import styled, { keyframes } from "styled-components";
import { __COLORS } from "../theme/theme";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }

  85% {
    transform: rotate(3600deg);
  }
  
  100% {
    transform: rotate(3600deg);
  }
`;

const SpinnerWrapper = styled.div`
  width: 100px;
  height: 100px;
`;

const RotatingGroup = styled.g<{ infinite?: boolean }>`
  animation: ${rotate} 7s ease-out ${(p) => (p.infinite ? "infinite" : "")};
  transform-origin: center;
`;

type Props = {
  infinite?: boolean;
};
const RouletteSpinner: React.FC<Props> = ({ infinite }) => {
  return (
    <SpinnerWrapper>
      <svg
        fill={__COLORS.PRIMARY}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 56 56"
        version="1.1"
        x="0px"
        y="0px"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <RotatingGroup
            infinite={infinite}
            fill={__COLORS.GRAY}
            fill-rule="nonzero"
          >
            <path
              fill={__COLORS.RED}
              d="M11,28 C11,27.562 11.033,27.132 11.066,26.7 L8.08,26.417 C8.039,26.943 8,27.466 8,28 C8,28.553 8.039,29.1 8.083,29.638 L11.058,29.144 C11.032,28.765 11,28.386 11,28 Z"
            />
            <path
              fill={__COLORS.BLACK}
              d="M11.3,31.13 L8.344,31.621 C8.54102336,32.6803423 8.82429972,33.7218094 9.191,34.735 L11.926,33.491 C11.6606589,32.7201294 11.451446,31.931069 11.3,31.13 Z"
            />
            <path
              fill={__COLORS.RED}
              d="M13.977,18.408 L11.537,16.67 C10.9290044,17.5561938 10.3939155,18.4902584 9.937,19.463 L12.753,20.522 C13.1098185,19.7889149 13.5188726,19.0824276 13.977,18.408 Z"
            />
            <path
              fill={__COLORS.BLACK}
              d="M11.981,22.363 L9.175,21.311 C8.81057871,22.3283843 8.52997668,23.3738694 8.336,24.437 L11.323,24.725 C11.4847229,23.9227419 11.7046375,23.1333221 11.981,22.363 Z"
            />
            <path
              fill={__COLORS.RED}
              d="M16.67,44.463 C17.5561938,45.0709956 18.4902584,45.6060845 19.463,46.063 L20.522,43.247 C19.7890332,42.8914707 19.0825489,42.483755 18.408,42.027 L16.67,44.463 Z"
            />
            <path
              fill={__COLORS.RED}
              d="M12.689,35.338 L9.962,36.582 C10.4233948,37.5574447 10.9631653,38.4938496 11.576,39.382 L13.893,37.475 C13.4407666,36.7925667 13.0383876,36.0783773 12.689,35.338 Z"
            />
            <path
              fill={__COLORS.BLACK}
              d="M15.108,39.051 L12.8,40.962 C13.4994852,41.7824841 14.2635977,42.5455933 15.085,43.244 L16.835,40.787 C16.2189084,40.2500044 15.641786,39.6698744 15.108,39.051 Z"
            />
            <path
              fill={__COLORS.BLACK}
              d="M40.892,16.949 L43.202,15.038 C42.5025148,14.2175159 41.7384023,13.4544067 40.917,12.756 L39.167,15.213 C39.7824028,15.7500674 40.3588552,16.3301957 40.892,16.949 Z"
            />
            <path
              fill={__COLORS.BLACK}
              d="M34.689,9.175 C33.6905517,8.81662022 32.664917,8.53906012 31.622,8.345 L31.132,11.302 C31.9832463,11.463458 32.8207404,11.6904674 33.637,11.981 L34.689,9.175 Z"
            />
            <path
              fill={__COLORS.BLACK}
              d="M21.311,46.825 C22.3283843,47.1894213 23.3738694,47.4700233 24.437,47.664 L24.725,44.677 C23.9227419,44.5152771 23.1333221,44.2953625 22.363,44.019 L21.311,46.825 Z"
            />
            <path
              fill={__COLORS.RED}
              d="M39.33,11.537 C38.4438062,10.9290044 37.5097416,10.3939155 36.537,9.937 L35.478,12.753 C36.2109668,13.1085293 36.9174511,13.516245 37.592,13.973 L39.33,11.537 Z"
            />
            <path
              fill={__COLORS.BLACK}
              d="M16.949,15.108 L15.038,12.8 C14.2175159,13.4994852 13.4544067,14.2635977 12.756,15.085 L15.213,16.835 C15.7499956,16.2189084 16.3301256,15.641786 16.949,15.108 Z"
            />
            <path
              fill={__COLORS.RED}
              d="M43.311,20.662 L46.038,19.418 C45.5766052,18.4425553 45.0368347,17.5061504 44.424,16.618 L42.107,18.525 C42.5592334,19.2074333 42.9616124,19.9216227 43.311,20.662 Z"
            />
            <path
              fill={__COLORS.RED}
              d="M20.662,12.689 L19.418,9.962 C18.4425553,10.4233948 17.5061504,10.9631653 16.618,11.576 L18.525,13.893 C19.2074333,13.4407666 19.9216227,13.0383876 20.662,12.689 Z"
            />
            <path
              fill={__COLORS.BLACK}
              d="M24.87,11.3 L24.379,8.344 C23.3196577,8.54102336 22.2781906,8.82429972 21.265,9.191 L22.509,11.926 C23.2798706,11.6606589 24.068931,11.451446 24.87,11.3 Z"
            />
            <path
              fill={__COLORS.RED}
              d="M28,11 C28.386,11 28.763,11.033 29.143,11.058 L29.643,8.083 C29.1,8.039 28.553,8 28,8 C27.447,8 26.9,8.039 26.362,8.083 L26.856,11.058 C27.235,11.032 27.614,11 28,11 Z"
            />
            <path
              fill={__COLORS.BLACK}
              d="M44.7,24.87 L47.656,24.379 C47.4589766,23.3196577 47.1757003,22.2781906 46.809,21.265 L44.074,22.509 C44.3393411,23.2798706 44.548554,24.068931 44.7,24.87 Z"
            />
            <path
              fill={__COLORS.BLACK}
              d="M39.051,40.892 L40.962,43.202 C41.7824841,42.5025148 42.5455933,41.7384023 43.244,40.917 L40.787,39.167 C40.2499326,39.7824028 39.6698043,40.3588552 39.051,40.892 Z"
            />
            <path
              fill={__COLORS.RED}
              d="M35.338,43.311 L36.582,46.038 C37.5574447,45.5766052 38.4938496,45.0368347 39.382,44.424 L37.475,42.107 C36.7925667,42.5592334 36.0783773,42.9616124 35.338,43.311 Z"
            />
            <path
              fill={__COLORS.RED}
              d="M42.023,37.592 L44.463,39.33 C45.0709956,38.4438062 45.6060845,37.5097416 46.063,36.537 L43.247,35.478 C42.8901815,36.2110851 42.4811274,36.9175724 42.023,37.592 Z"
            />
            <path
              fill={__COLORS.RED}
              d="M44.942,26.856 C44.968,27.235 45,27.614 45,28 C45,28.438 44.967,28.868 44.934,29.3 L47.92,29.583 C47.961,29.059 48,28.536 48,28.002 C48,27.449 47.961,26.902 47.917,26.364 L44.942,26.856 Z"
            />
            <path
              fill={__COLORS.BLACK}
              d="M44.019,33.637 L46.825,34.689 C47.1894213,33.6716157 47.4700233,32.6261306 47.664,31.563 L44.677,31.275 C44.5152771,32.0772581 44.2953625,32.8666779 44.019,33.637 Z"
            />
            <path
              fill={__COLORS.BLACK}
              d="M41.808,33.858 C41.815,33.84 41.822,33.823 41.83,33.806 C45.0275755,26.1882299 41.4633619,17.4189769 33.858,14.192 L33.806,14.17 C26.1882299,10.9724245 17.4189769,14.5366381 14.192,22.142 L14.171,22.194 C10.9697424,29.8114749 14.5344882,38.5831376 22.142,41.808 L22.194,41.829 C29.8114749,45.0302576 38.5831376,41.4655118 41.808,33.858 Z M31.974,31 C31.6958913,31.3681062 31.3681062,31.6958913 31,31.974 L31,38 C31,39.6568542 29.6568542,41 28,41 C26.3431458,41 25,39.6568542 25,38 L25,31.974 C24.6318938,31.6958913 24.3041087,31.3681062 24.026,31 L18,31 C16.3431458,31 15,29.6568542 15,28 C15,26.3431458 16.3431458,25 18,25 L24.026,25 C24.3041087,24.6318938 24.6318938,24.3041087 25,24.026 L25,18 C25,16.3431458 26.3431458,15 28,15 C29.6568542,15 31,16.3431458 31,18 L31,24.026 C31.3681062,24.3041087 31.6958913,24.6318938 31.974,25 L38,25 C39.6568542,25 41,26.3431458 41,28 C41,29.6568542 39.6568542,31 38,31 L31.974,31 Z"
            />
            <path
              fill={__COLORS.BLACK}
              d="M31.13,44.7 L31.621,47.656 C32.6803423,47.4589766 33.7218094,47.1757003 34.735,46.809 L33.491,44.074 C32.7201294,44.3393411 31.931069,44.548554 31.13,44.7 Z"
            />
            <path
              fill={__COLORS.RED}
              d="M28,45 C27.562,45 27.132,44.967 26.7,44.934 L26.417,47.92 C26.941,47.961 27.464,48 27.998,48 C28.551,48 29.098,47.961 29.636,47.917 L29.142,44.942 C28.765,44.968 28.386,45 28,45 Z"
            />
            <path
              fill={__COLORS.GOLD}
              d="M29,23.1 L29,18 C29,17.4477153 28.5522847,17 28,17 C27.4477153,17 27,17.4477153 27,18 L27,23.1 C27.6598632,22.965306 28.3401368,22.965306 29,23.1 Z"
            />
            <path
              fill={__COLORS.GOLD}
              d="M27,32.9 L27,38 C27,38.5522847 27.4477153,39 28,39 C28.5522847,39 29,38.5522847 29,38 L29,32.9 C28.3401368,33.034694 27.6598632,33.034694 27,32.9 Z"
            />
            <path
              fill={__COLORS.GOLD}
              d="M18,27 C17.4477153,27 17,27.4477153 17,28 C17,28.5522847 17.4477153,29 18,29 L23.1,29 C22.965306,28.3401368 22.965306,27.6598632 23.1,27 L18,27 Z"
            />
            <path
              fill={__COLORS.GOLD}
              d="M38,27 L32.9,27 C33.034694,27.6598632 33.034694,28.3401368 32.9,29 L38,29 C38.5522847,29 39,28.5522847 39,28 C39,27.4477153 38.5522847,27 38,27 Z"
            />
            <circle fill={__COLORS.GOLD} cx="28" cy="28" r="3"></circle>
          </RotatingGroup>
          <path
            fill={__COLORS.BLACK}
            d="M28,0 C12.536027,-5.10702591e-15 -5.10702591e-15,12.536027 -7.10542736e-15,28 C-9.1038288e-15,43.463973 12.536027,56 28,56 C43.463973,56 56,43.463973 56,28 C55.9823655,12.5433374 43.4566626,0.0176345439 28,0 Z M28,54 C13.6472217,53.9840179 2.01598214,42.3527783 2,28 C2,27.4477153 2.44771525,27 3,27 C3.55228475,27 4,27.4477153 4,28 C4.01542952,41.2484376 14.7515624,51.9845705 28,52 C28.5522847,52 29,52.4477153 29,53 C29,53.5522847 28.5522847,54 28,54 Z M41.473,45.374 L41.467,45.381 L41.455,45.388 C38.4084248,47.7547109 34.7907235,49.2746491 30.968,49.794 L30.942,49.794 C23.1687336,50.8574098 15.4204795,47.681358 10.63,41.468 L10.623,41.463 L10.617,41.452 C8.24885405,38.407263 6.72717337,34.7908997 6.206,30.969 L6.206,30.964 L6.206,30.957 C6.07150917,29.9770259 6.00268903,28.9891561 6,28 C6.00098649,21.2012621 9.14953311,14.7860106 14.527,10.626 L14.533,10.619 L14.544,10.619 C17.5897544,8.24900032 21.2080549,6.72654037 25.032,6.206 L25.04,6.206 C27.0012814,5.93400626 28.9907186,5.93400626 30.952,6.206 L30.96,6.206 C36.6660433,6.98711148 41.8382656,9.97462096 45.366,14.527 L45.373,14.533 L45.379,14.544 C47.7460692,17.5904691 49.266356,21.208179 49.786,25.031 L49.786,25.036 L49.786,25.043 C49.9231671,26.0227945 49.9946599,27.0106651 50,28 C49.9990135,34.7987379 46.8504669,41.2139894 41.473,45.374 Z M53,29 C52.4477153,29 52,28.5522847 52,28 C51.9845705,14.7515624 41.2484376,4.01542952 28,4 C27.4477153,4 27,3.55228475 27,3 C27,2.44771525 27.4477153,2 28,2 C42.3527783,2.01598214 53.9840179,13.6472217 54,28 C54,28.5522847 53.5522847,29 53,29 Z"
          />
        </g>
      </svg>
    </SpinnerWrapper>
  );
};

export default RouletteSpinner;