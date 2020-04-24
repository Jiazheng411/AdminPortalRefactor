package AdminPortalTesting;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

import java.util.Arrays;
import java.util.Random;

public class AdminLoginXSSRobustness {
    private static String myUserName = "admin";
    private static String myPassword = "admin";
    private static String XSSscript = "<script>alert('hi');</script>";
    public static void main(String[] args) throws InterruptedException{
        System.setProperty("webdriver.gecko.driver","C:/Users/User/Downloads/geckodriver-v0.26.0-win64/geckodriver.exe");
        WebDriver driver = new FirefoxDriver();

        // go to index page
        driver.get("http://127.0.0.1:80");
        Thread.sleep(1000);

        fuzzer_login(5, driver);

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

        // go to add page
        driver.findElement(By.id("add")).click();
        Thread.sleep(1000);
        System.out.println("In page: " + driver.getTitle());

        System.out.println("*****add agent******");
        // add agent with empty field
        driver.findElement(By.id("firstname")).sendKeys(XSSscript);
        driver.findElement(By.id("lastname")).sendKeys(XSSscript);
        driver.findElement(By.id("email")).sendKeys(XSSscript);
        driver.findElement(By.id("password")).sendKeys(XSSscript);
        driver.findElement(By.id("confirm_password")).sendKeys(XSSscript);
        driver.findElement(By.id("english")).click();
        driver.findElement(By.id("malay")).click();
        driver.findElement(By.id("skill1")).click();
        driver.findElement(By.id("skill2")).click();

        driver.findElement(By.id("add")).click();
        Thread.sleep(1000);
        driver.switchTo().alert().accept();
        Thread.sleep(1000);

        // add agent with name only
        driver.findElement(By.id("firstname")).clear();
        driver.findElement(By.id("lastname")).clear();
        driver.findElement(By.id("firstname")).sendKeys("Apple");
        driver.findElement(By.id("lastname")).sendKeys("Wong");
        Thread.sleep(1000);
        driver.findElement(By.id("add")).click();
        Thread.sleep(1000);
        driver.switchTo().alert().accept();
        Thread.sleep(1000);


        // add agent with name and correct email only
        driver.findElement(By.id("email")).clear();
        driver.findElement(By.id("email")).sendKeys("someone" + 0 + "@gmail.com");
        Thread.sleep(1000);
        driver.findElement(By.id("add")).click();
        Thread.sleep(1000);
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


    }

    private static void fuzzer_login(int loginTime, WebDriver driver) throws InterruptedException{
        String username = "admin";
        String password = "admin";
        for(int i = 0; i < loginTime + 1; i++){
            Random r1 = new Random();
            int randomUsernameFuzzer = r1.nextInt(3);
            int randomPasswordFuzzer = r1.nextInt(3);
            String mutatedUsername;
            String mutatedPassword;

            if(randomUsernameFuzzer == 0){
                mutatedUsername = trim(username);
            }else if(randomUsernameFuzzer == 1){
                mutatedUsername = bitflip(username);
            }else{
                mutatedUsername = swap(username);
            }
            if (randomPasswordFuzzer == 0){
                mutatedPassword = trim(password);
            }else if (randomPasswordFuzzer == 1){
                mutatedPassword = bitflip(password);
            }else{
                mutatedPassword = swap(password);
            }

            if(i == 0){
                mutatedUsername = "<script>alert('hi');</script>";
                mutatedPassword = "<script>alert('hi');</script>";
            }

            driver.navigate().to("http://127.0.0.1:80/login");

            // get the user name and password field of the account page
            WebElement usernameWeb = driver.findElement(By.id("username"));
            WebElement passwordWeb = driver.findElement(By.id("password"));

            // fake user name and password
            usernameWeb.sendKeys(mutatedUsername);
            passwordWeb.sendKeys(mutatedPassword);
            Thread.sleep(1000);

            // verify that it still stays in this page
            // send my user name to fill up the box
            driver.findElement(By.id("log_in")).click();
            System.out.println("In page: " + driver.getTitle());
            Thread.sleep(1000);
        }
    }

    private static String trim(String original){
        char[] ch = original.toCharArray();
        Random r = new Random();
        int trimPos = r.nextInt(original.length() - 1);
        char[] newCh = Arrays.copyOfRange(ch, trimPos, original.length());

        return String.valueOf(newCh);
    }

    private static String bitflip(String original){
        char[] ch = original.toCharArray();
        for(char i:ch){
            System.out.println(i);
        }
        Random r = new Random();
        int flipPos = r.nextInt(original.length());
        char CharToFlip = ch[flipPos];
        String binaryCh = Integer.toBinaryString(CharToFlip);
        int bitPos = r.nextInt(binaryCh.length());
        // System.out.println("" + binaryCh + " " + binaryCh.length() + " " + bitPos);
        int flippedInt = (int)CharToFlip ^ (1 << bitPos);
        //System.out.println("" + flippedInt);
        char flippedCh = (char)flippedInt;
        //System.out.println("" + flippedCh);
        //System.out.println("" + Integer.toBinaryString(flippedCh));
        ch[flipPos] = flippedCh;
        return String.valueOf(ch);
    }

    private static String swap(String original){
        char[] ch = original.toCharArray();
        Random r = new Random();
        int swapPos = r.nextInt(original.length());
        if(swapPos == original.length()-1){
            char temp = ch[swapPos];
            ch[swapPos] = ch[swapPos - 1];
            ch[swapPos - 1] = temp;
        }else{
            char temp = ch[swapPos];
            ch[swapPos] = ch[swapPos + 1];
            ch[swapPos + 1] = temp;
        }
        return String.valueOf(ch);
    }

}
