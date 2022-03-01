import React from 'react'
import './End.css';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import Congrats from '../../components/Congrats/Congrats';

const End = ({
  mode,
  total,
  correct,
  guessTimes,
  handleReturnToHome
}) => {

  const correctPercent = (correct / total) * 100 || 0;
  const incorrectTotal = total - correct;
  const incorrectPercent = (incorrectTotal / total) * 100 || 0;

  const timeSum = guessTimes.reduce((prev, curr) => prev + curr, 0);
  const selectionTime = timeSum / guessTimes.length || 0;

  return (
    <>
      <Header />

      <div className="end">
        <div className="end__hero">
          <Congrats total={total} correct={correct} />
        </div>

        <div className="end__button--return">
          <Button
            text="Return to Home"
            onClick={handleReturnToHome}
          />
        </div>

        <div className="end__scores">
          <div className="end__scores--column">
            <div className="end__scores--score">{correctPercent.toFixed()}%</div>
            <div className="end__scores--label">Correct Selections</div>
          </div>

          <div className="end__scores--column">
            <div className="end__scores--score">{incorrectPercent.toFixed()}%</div>
            <div className="end__scores--label">Incorrect Selections</div>
          </div>

          {mode === "timed" && (
            <div className="end__scores--column">
              <div className="end__scores--score">
                {selectionTime === 0 ? 0 : (
                  <>
                    {("0" + Math.floor((selectionTime / 1000) % 60)).slice(-1)}.
                    {("0" + ((selectionTime / 10) % 100)).slice(-2)}
                  </>
                )}s
              </div>
              <div className="end__scores--label">Avg Selection Time</div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default End