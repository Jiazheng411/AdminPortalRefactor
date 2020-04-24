package AdminPortalTesting;

import org.openqa.selenium.By;
import org.openqa.selenium.NoAlertPresentException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;


public class AdminRobustness {
    private static int numberofThread = 3;
    public static void main(String[] args) {

        for (int i = 0; i < numberofThread; i++) {
            AdminTest test  = new AdminTest(i);
            test.start();
        }
    }
}


class AdminTest extends Thread {
    private int index = 0;
    AdminTest(int i){
        index = i;
    }
    @Override
    public void run() {
        try {

            int agentIndex = index;

            System.setProperty("webdriver.gecko.driver", "C:/Users/User/Downloads/geckodriver-v0.26.0-win64/geckodriver.exe");
            WebDriver driver = new FirefoxDriver();

            // go to index page
            driver.get("http://127.0.0.1:80/login");
            Thread.sleep(1000);

            // get the user name and password field of the account page
            WebElement username = driver.findElement(By.id("username"));
            WebElement password = driver.findElement(By.id("password"));

            // locate the "Next" button in the account page
            username.sendKeys("admin");
            password.sendKeys("admin");
            Thread.sleep(1000);
            // login
            driver.findElement(By.id("log_in")).click();
            System.out.println(driver.getTitle());
            Thread.sleep(1000);

            // go to adding agents page
            driver.findElement(By.id("add")).click();
            Thread.sleep(1000);
            System.out.println("In page: " + driver.getTitle());

            System.out.println("*****add agent******");
            // add agent with empty field
            driver.findElement(By.id("add")).click();
            Thread.sleep(1000);
            new WebDriverWait(driver, 60)
                    .ignoring(NoAlertPresentException.class)
                    .until(ExpectedConditions.alertIsPresent());
            driver.switchTo().alert().accept();
            Thread.sleep(1000);

            // fill in attributes
            driver.findElement(By.id("firstname")).sendKeys("Apple");
            driver.findElement(By.id("lastname")).sendKeys("Wong");
            driver.findElement(By.id("email")).sendKeys("someagent" + agentIndex + "@gmail.com");
            Thread.sleep(1000);
            driver.findElement(By.id("password")).sendKeys("Sutd@12345");
            driver.findElement(By.id("confirm_password")).sendKeys("Sutd@12345");
            Thread.sleep(1000);
            driver.findElement(By.id("chinese")).click();
            driver.findElement(By.id("english")).click();
            driver.findElement(By.id("malay")).click();
            driver.findElement(By.id("skill1")).click();
            driver.findElement(By.id("skill2")).click();
            driver.findElement(By.id("skill3")).click();
            Thread.sleep(1000);
            driver.findElement(By.id("add")).click();
            Thread.sleep(1000);
            new WebDriverWait(driver, 60)
                    .ignoring(NoAlertPresentException.class)
                    .until(ExpectedConditions.alertIsPresent());
            driver.switchTo().alert().accept();
            Thread.sleep(1000);

            String current_page_title = driver.getTitle();

            while ("Add Agent".equals(current_page_title)) {
                agentIndex += 1;
                driver.findElement(By.id("email")).clear();
                driver.findElement(By.id("email")).sendKeys("someagent" + agentIndex + "@gmail.com");
                Thread.sleep(1000);
                driver.findElement(By.id("add")).click();
                Thread.sleep(1000);
                new WebDriverWait(driver, 60)
                        .ignoring(NoAlertPresentException.class)
                        .until(ExpectedConditions.alertIsPresent());
                driver.switchTo().alert().accept();
                Thread.sleep(1500);
                current_page_title = driver.getTitle();
            }

            // go to view agents page
            driver.findElement(By.id("view")).click();
            System.out.println(driver.getTitle());
            Thread.sleep(2000);

            //
            java.util.List<WebElement> edit_buttons = driver.findElements(By.name("edit"));
            System.out.println(edit_buttons.size());

            // edit agents
            edit_buttons.get(2).click();
            Thread.sleep(1000);
            driver.findElement(By.id("chinese")).click();
            driver.findElement(By.id("skill1")).click();
            driver.findElement(By.id("save")).click();
            Thread.sleep(1000);
            new WebDriverWait(driver, 60)
                    .ignoring(NoAlertPresentException.class)
                    .until(ExpectedConditions.alertIsPresent());
            driver.switchTo().alert().accept();

        }catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
