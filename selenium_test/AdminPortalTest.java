package AdminPortalTesting;

import org.openqa.selenium.By;
import org.openqa.selenium.NoAlertPresentException;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class AdminPortalTest {

    static String myUserName = "admin";
    static String myPassword = "admin";
    static int agentIndex = 0;

    public static void main(String[] args) throws InterruptedException {

        System.setProperty("webdriver.gecko.driver","C:/Users/User/Downloads/geckodriver-v0.26.0-win64/geckodriver.exe");
        WebDriver driver = new FirefoxDriver();

        System.out.println("****check session****");
        // go to index page
        driver.get("http://127.0.0.1:80");
        Thread.sleep(2000);
        driver.navigate().to("http://127.0.0.1:80/home");
        System.out.println("going to /home without login");
        System.out.println("Im in page " + driver.getTitle());
        Thread.sleep(2000);
        driver.navigate().to("http://127.0.0.1:80/view_agents");
        System.out.println("going to /view_agents without login");
        System.out.println("Im in page " + driver.getTitle());
        Thread.sleep(2000);
        driver.navigate().to("http://127.0.0.1:80/edit_agent/someid");
        System.out.println("going to /edit_agent without login");
        System.out.println("Im in page " + driver.getTitle());
        Thread.sleep(2000);


        System.out.println("****login****");
        // click the button and go to login page
        System.out.println("In page: " + driver.getTitle());
        Thread.sleep(1000);

        // get the user name and password field of the account page
        WebElement username = driver.findElement(By.id("username"));
        WebElement password = driver.findElement(By.id("password"));

        // fake user name and password
        username.sendKeys("fake_user_name");
        password.sendKeys("fake_pass_word");
        Thread.sleep(1000);

        // verify that it still stays in this page
        // send my user name to fill up the box
        driver.findElement(By.id("log_in")).click();
        System.out.println("In page: " + driver.getTitle());
        Thread.sleep(1000);

        // get the user name and password field of the account page
        WebElement username_1 = driver.findElement(By.id("username"));
        WebElement password_2 = driver.findElement(By.id("password"));

        // locate the "Next" button in the account page
        username_1.sendKeys(myUserName);
        password_2.sendKeys(myPassword);
        Thread.sleep(1000);
        // login
        driver.findElement(By.id("log_in")).click();
        System.out.println(driver.getTitle());
        Thread.sleep(1000);

        System.out.println("I'm in page: " + driver.getTitle());
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

        // add agent with name only
        driver.findElement(By.id("firstname")).sendKeys("Apple");
        driver.findElement(By.id("lastname")).sendKeys("Wong");
        Thread.sleep(1000);
        driver.findElement(By.id("add")).click();
        Thread.sleep(1000);
        new WebDriverWait(driver, 60)
                .ignoring(NoAlertPresentException.class)
                .until(ExpectedConditions.alertIsPresent());
        driver.switchTo().alert().accept();
        Thread.sleep(1000);

        // add agent with name and wrong email only
        driver.findElement(By.id("email")).sendKeys("this is an invalid email");
        Thread.sleep(1000);
        driver.findElement(By.id("add")).click();
        Thread.sleep(1000);
        new WebDriverWait(driver, 60)
                .ignoring(NoAlertPresentException.class)
                .until(ExpectedConditions.alertIsPresent());
        driver.switchTo().alert().accept();
        Thread.sleep(1000);

        // add agent with name and correct email only
        driver.findElement(By.id("email")).clear();
        driver.findElement(By.id("email")).sendKeys("someone" + agentIndex + "@gmail.com");
        Thread.sleep(1000);
        driver.findElement(By.id("add")).click();
        Thread.sleep(1000);
        new WebDriverWait(driver, 60)
                .ignoring(NoAlertPresentException.class)
                .until(ExpectedConditions.alertIsPresent());
        driver.switchTo().alert().accept();
        Thread.sleep(1000);

        // add agent with name and correct email only
        driver.findElement(By.id("password")).sendKeys("invalidpassword");
        driver.findElement(By.id("confirm_password")).sendKeys("invalidpassword");
        Thread.sleep(1000);
        driver.findElement(By.id("add")).click();
        Thread.sleep(1000);
        new WebDriverWait(driver, 60)
                .ignoring(NoAlertPresentException.class)
                .until(ExpectedConditions.alertIsPresent());
        driver.switchTo().alert().accept();
        Thread.sleep(1000);

        // add agent with name and correct email only
        driver.findElement(By.id("password")).clear();
        driver.findElement(By.id("confirm_password")).clear();
        driver.findElement(By.id("password")).sendKeys("Sutd@12345");
        driver.findElement(By.id("confirm_password")).sendKeys("Sutd@12345");
        Thread.sleep(1000);
        driver.findElement(By.id("add")).click();
        Thread.sleep(1000);
        new WebDriverWait(driver, 60)
                .ignoring(NoAlertPresentException.class)
                .until(ExpectedConditions.alertIsPresent());
        driver.switchTo().alert().accept();
        Thread.sleep(1000);

        // add skill and language
        driver.findElement(By.id("english")).click();
        driver.findElement(By.id("malay")).click();
        driver.findElement(By.id("skill1")).click();
        driver.findElement(By.id("skill2")).click();
        Thread.sleep(1000);
        driver.findElement(By.id("add")).click();
        Thread.sleep(1000);
        new WebDriverWait(driver, 60)
                .ignoring(NoAlertPresentException.class)
                .until(ExpectedConditions.alertIsPresent());
        driver.switchTo().alert().accept();
        Thread.sleep(1000);

        String current_page_title = driver.getTitle();

        while("Add Agent".equals(current_page_title)){
            agentIndex += 1;
            driver.findElement(By.id("email")).clear();
            driver.findElement(By.id("email")).sendKeys("someone" + agentIndex + "@gmail.com");
            Thread.sleep(1000);
            driver.findElement(By.id("add")).click();
            Thread.sleep(1000);
            new WebDriverWait(driver, 60)
                    .ignoring(NoAlertPresentException.class)
                    .until(ExpectedConditions.alertIsPresent());
            driver.switchTo().alert().accept();
            Thread.sleep(1000);
            current_page_title = driver.getTitle();
        }

        // add agent and back to home
        // go to adding agents page
        driver.findElement(By.id("add")).click();
        System.out.println(driver.getTitle());
        Thread.sleep(1000);
        driver.findElement(By.id("back")).click();
        System.out.println(driver.getTitle());
        Thread.sleep(1000);

        // go to view agents page
        driver.findElement(By.id("view")).click();
        System.out.println(driver.getTitle());
        Thread.sleep(1000);


        //
        java.util.List<WebElement> edit_buttons = driver.findElements(By.name("edit"));
        System.out.println(edit_buttons.size());

        // print all the links
//        for (int i = 0; i < edit_buttons.size(); i=i+1) {
//
//            boolean staleElementLoaded = true;
//            //the loop checks whether the elements is properly loaded
//            while(staleElementLoaded) {
//                try {
//                    //navigate to the link
//                    edit_buttons.get(i).click();
//                    Thread.sleep(1000);
//                    driver.findElement(By.id("back")).click();
//                    Thread.sleep(1000);
//                    edit_buttons = driver.findElements(By.name("edit"));
//                    staleElementLoaded = false;
//                } catch (StaleElementReferenceException e) {
//                    staleElementLoaded = true;
//                }
//            }
//        }

        edit_buttons = driver.findElements(By.name("edit"));
        System.out.println(edit_buttons.size());

        // print all the links
        for (int i = 0; i < edit_buttons.size(); i=i+1) {

            edit_buttons.get(i).click();
            Thread.sleep(1000);
            driver.findElement(By.id("firstname")).sendKeys("one");
//            driver.findElement(By.id("chinese")).click();
//            driver.findElement(By.id("skill1")).click();
            driver.findElement(By.id("save")).click();
            Thread.sleep(1000);
            new WebDriverWait(driver, 60)
                    .ignoring(NoAlertPresentException.class)
                    .until(ExpectedConditions.alertIsPresent());
            driver.switchTo().alert().accept();
            Thread.sleep(3500);
            edit_buttons = driver.findElements(By.name("edit"));

        }

    }

}
